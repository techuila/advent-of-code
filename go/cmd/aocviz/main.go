// Command aocviz visualizes how the Day 2 (2025) Part 2 solutions behave
// under the hood: wall time, bytes allocated, heap allocation count, GC
// cycles, live heap, plus an algorithmic trace and compile-time escape
// analysis (what lives on the stack vs the heap).
//
// Run it from the module root (the `go/` directory):
//
//	go run ./cmd/aocviz
//	go run ./cmd/aocviz -input internal/2025/day02/testdata/input_1.txt
//
// It does not modify any solution code — it imports the day02 package and
// re-implements *instrumented* copies of the algorithms purely for counting.
package main

import (
	"bufio"
	"flag"
	"fmt"
	"os"
	"os/exec"
	"runtime"
	"sort"
	"strconv"
	"strings"
	"text/tabwriter"
	"time"

	day02 "aoc/internal/2025/day02"
)

func main() {
	input := flag.String("input", "internal/2025/day02/testdata/input_2.txt",
		"path to a Day 2 input file (run from the go/ module root)")
	flag.Parse()

	data, err := os.ReadFile(*input)
	if err != nil {
		fmt.Fprintf(os.Stderr, "could not read %s: %v\n(run this from the go/ module root)\n", *input, err)
		os.Exit(1)
	}
	lines := strings.Split(string(data), "\n")
	ranges := parseRanges(lines)

	section("INPUT")
	totalWidth := 0
	maxHi := 0
	for _, r := range ranges {
		totalWidth += r.hi - r.lo + 1
		if r.hi > maxHi {
			maxHi = r.hi
		}
	}
	fmt.Printf("  file              %s\n", *input)
	fmt.Printf("  ranges            %s\n", group(len(ranges)))
	fmt.Printf("  largest value     %s  (%d digits)\n", group(maxHi), len(strconv.Itoa(maxHi)))
	fmt.Printf("  Σ range widths    %s  ← brute force visits every one of these\n", group(totalWidth))

	// ---- Measure both solutions at runtime ------------------------------
	section("RUNTIME COST  (runtime.MemStats deltas around one full solve)")
	brute := measure("brute  SolvePart2", func() int { return day02.SolvePart2(lines) })
	opt := measure("optimal SolvePart2Optimal", func() int { return day02.SolvePart2Optimal(lines) })

	printStatsTable(brute, opt)

	if brute.value != opt.value {
		fmt.Printf("\n  ⚠ results differ! brute=%d optimal=%d\n", brute.value, opt.value)
	} else {
		fmt.Printf("\n  ✓ both produce the same answer: %s\n", group(brute.value))
	}

	// ---- Visual comparison ----------------------------------------------
	section("VISUAL COMPARISON  (longer bar = more / slower)")
	bars := []struct {
		label string
		b, o  float64
		fmt   func(float64) string
	}{
		{"wall time", float64(brute.dur), float64(opt.dur), func(f float64) string { return time.Duration(f).String() }},
		{"bytes allocated", float64(brute.bytes), float64(opt.bytes), func(f float64) string { return humanBytes(uint64(f)) }},
		{"heap allocations", float64(brute.allocs), float64(opt.allocs), func(f float64) string { return group(int(f)) }},
		{"GC cycles", float64(brute.gc), float64(opt.gc), func(f float64) string { return group(int(f)) }},
	}
	for _, b := range bars {
		max := b.b
		if b.o > max {
			max = b.o
		}
		fmt.Printf("\n  %s\n", b.label)
		fmt.Printf("    brute   %-22s %s\n", b.fmt(b.b), barOf(b.b, max))
		fmt.Printf("    optimal %-22s %s\n", b.fmt(b.o), barOf(b.o, max))
		if b.o > 0 {
			fmt.Printf("    → brute is %.1f× heavier\n", b.b/b.o)
		}
	}

	// ---- Algorithmic trace ----------------------------------------------
	section("UNDER THE HOOD  (why the numbers look like that)")
	traceBrute(ranges, totalWidth)
	fmt.Println()
	traceOptimal(ranges, len(strconv.Itoa(maxHi)))

	// ---- Stack vs heap via escape analysis ------------------------------
	section("STACK vs HEAP  (compiler escape analysis: go build -gcflags=-m)")
	escapeAnalysis()

	fmt.Println()
}

// ----------------------------------------------------------------------------
// Runtime measurement
// ----------------------------------------------------------------------------

type stats struct {
	name      string
	value     int
	dur       time.Duration
	bytes     uint64 // total bytes allocated during the call (cumulative, incl. freed)
	allocs    uint64 // number of heap allocation events
	gc        uint32 // GC cycles triggered during the call
	heapAfter uint64 // live heap immediately after
}

// measure runs fn once with a clean GC baseline and captures MemStats deltas.
// TotalAlloc/Mallocs are cumulative counters, so the delta is the exact amount
// this single call allocated — even though the GC may have freed most of it
// again during the run (that churn is what NumGC reveals).
func measure(name string, fn func() int) stats {
	runtime.GC()
	var m0, m1 runtime.MemStats
	runtime.ReadMemStats(&m0)

	start := time.Now()
	val := fn()
	dur := time.Since(start)

	runtime.ReadMemStats(&m1)
	return stats{
		name:      name,
		value:     val,
		dur:       dur,
		bytes:     m1.TotalAlloc - m0.TotalAlloc,
		allocs:    m1.Mallocs - m0.Mallocs,
		gc:        m1.NumGC - m0.NumGC,
		heapAfter: m1.HeapAlloc,
	}
}

func printStatsTable(rows ...stats) {
	w := tabwriter.NewWriter(os.Stdout, 0, 4, 2, ' ', 0)
	fmt.Fprintln(w, "  metric\tbrute\toptimal")
	fmt.Fprintln(w, "  ------\t-----\t-------")
	fmt.Fprintf(w, "  wall time\t%s\t%s\n", rows[0].dur, rows[1].dur)
	fmt.Fprintf(w, "  bytes allocated (total)\t%s\t%s\n", humanBytes(rows[0].bytes), humanBytes(rows[1].bytes))
	fmt.Fprintf(w, "  heap allocations (count)\t%s\t%s\n", group(int(rows[0].allocs)), group(int(rows[1].allocs)))
	fmt.Fprintf(w, "  GC cycles triggered\t%s\t%s\n", group(int(rows[0].gc)), group(int(rows[1].gc)))
	fmt.Fprintf(w, "  live heap after\t%s\t%s\n", humanBytes(rows[0].heapAfter), humanBytes(rows[1].heapAfter))
	w.Flush()
	fmt.Println("\n  note: \"bytes allocated\" is cumulative — it counts memory the GC may")
	fmt.Println("  have already reclaimed. High total + low live heap = lots of garbage")
	fmt.Println("  churned through the heap, which is exactly what drives GC cycles up.")
}

// ----------------------------------------------------------------------------
// Algorithmic traces (instrumented re-implementations, for explanation only)
// ----------------------------------------------------------------------------

type rng struct{ lo, hi int }

func traceBrute(ranges []rng, totalWidth int) {
	valid := 0
	for _, r := range ranges {
		for n := r.lo; n <= r.hi; n++ {
			if isRepeatedBlock(strconv.Itoa(n)) {
				valid++
			}
		}
	}
	fmt.Println("  brute force — \"scan every integer, stringify, test\"")
	fmt.Printf("    integers visited     %s\n", group(totalWidth))
	fmt.Printf("    strconv.Itoa calls   %s   ← one heap string per visited integer\n", group(totalWidth))
	fmt.Printf("    valid numbers found  %s\n", group(valid))
	fmt.Printf("    cost grows with      Σ range widths (the data), not the answer size\n")
}

func traceOptimal(ranges []rng, maxLen int) {
	seen := make(map[int]struct{})
	generated, dups := 0, 0
	perLen := map[int]int{}

	for L := 2; L <= maxLen; L++ {
		for d := 1; d < L; d++ {
			if L%d != 0 {
				continue
			}
			reps := L / d
			mul := pow10(d)
			for block := pow10(d - 1); block < mul; block++ {
				num := 0
				for range reps {
					num = num*mul + block
				}
				generated++
				if _, ok := seen[num]; ok {
					dups++
				} else {
					seen[num] = struct{}{}
					perLen[L]++
				}
			}
		}
	}

	nums := make([]int, 0, len(seen))
	for v := range seen {
		nums = append(nums, v)
	}
	sort.Ints(nums)

	fmt.Println("  optimal — \"generate the valid numbers, then binary-search each range\"")
	fmt.Printf("    candidates generated %s   ← integer math, no strings\n", group(generated))
	fmt.Printf("    duplicates skipped   %s   (e.g. 111111 made several ways)\n", group(dups))
	fmt.Printf("    unique valid numbers %s   ← the entire search space, materialized once\n", group(len(nums)))
	fmt.Printf("    range queries        %s × O(log %s) binary searches\n", group(len(ranges)), group(len(nums)))
	fmt.Println("    per-digit-length breakdown of the valid set:")

	lengths := make([]int, 0, len(perLen))
	for L := range perLen {
		lengths = append(lengths, L)
	}
	sort.Ints(lengths)
	maxCount := 0
	for _, L := range lengths {
		if perLen[L] > maxCount {
			maxCount = perLen[L]
		}
	}
	for _, L := range lengths {
		fmt.Printf("      %2d digits  %7s  %s\n", L, group(perLen[L]), barOf(float64(perLen[L]), float64(maxCount)))
	}
	fmt.Printf("    cost grows with      the size of the valid set (~the answer), not the data\n")
}

// isRepeatedBlock mirrors the package's notion of a valid number: its digits
// are some block repeated 2+ times.
func isRepeatedBlock(s string) bool {
	L := len(s)
	for d := 1; d < L; d++ {
		if L%d != 0 {
			continue
		}
		ok := true
		for i := d; i < L; i++ {
			if s[i] != s[i%d] {
				ok = false
				break
			}
		}
		if ok {
			return true
		}
	}
	return false
}

func pow10(n int) int {
	p := 1
	for range n {
		p *= 10
	}
	return p
}

// ----------------------------------------------------------------------------
// Escape analysis: what the compiler puts on the heap vs the stack
// ----------------------------------------------------------------------------

func escapeAnalysis() {
	cmd := exec.Command("go", "build", "-gcflags=-m", "./internal/2025/day02/")
	out, err := cmd.CombinedOutput()
	if err != nil && len(out) == 0 {
		fmt.Printf("  (could not run escape analysis: %v)\n", err)
		return
	}

	var heap, stack []string
	sc := bufio.NewScanner(strings.NewReader(string(out)))
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if !strings.Contains(line, "solve") { // only our files
			continue
		}
		switch {
		case strings.Contains(line, "escapes to heap"), strings.Contains(line, "moved to heap"):
			heap = append(heap, line)
		case strings.Contains(line, "does not escape"):
			stack = append(stack, line)
		}
	}

	fmt.Println("  HEAP — these allocations outlive their function, so the compiler")
	fmt.Println("  heap-allocates them (GC must later reclaim them):")
	printEscapes(heap, 12)
	fmt.Println()
	fmt.Println("  STACK — these stay within their function; freed for free on return,")
	fmt.Println("  no GC involvement (this is what keeps the hot loop allocation-free):")
	printEscapes(stack, 12)

	fmt.Println("\n  takeaway: \"using pointers\" would not help here — the values that")
	fmt.Println("  escape do so because of what they are (a map, growing slices), not")
	fmt.Println("  how they're passed. The win came from allocating them once, not per item.")
}

func printEscapes(lines []string, limit int) {
	if len(lines) == 0 {
		fmt.Println("    (none reported)")
		return
	}
	for i, l := range lines {
		if i == limit {
			fmt.Printf("    … and %d more\n", len(lines)-limit)
			break
		}
		fmt.Printf("    %s\n", l)
	}
}

// ----------------------------------------------------------------------------
// Small helpers
// ----------------------------------------------------------------------------

func parseRanges(lines []string) []rng {
	var out []rng
	for _, line := range lines {
		for part := range strings.SplitSeq(line, ",") {
			fields := strings.Split(part, "-")
			if len(fields) != 2 {
				continue
			}
			lo, err1 := strconv.Atoi(strings.TrimSpace(fields[0]))
			hi, err2 := strconv.Atoi(strings.TrimSpace(fields[1]))
			if err1 != nil || err2 != nil {
				continue
			}
			out = append(out, rng{lo, hi})
		}
	}
	return out
}

func section(title string) {
	fmt.Printf("\n\033[1m== %s ==\033[0m\n\n", title)
}

func barOf(v, max float64) string {
	const width = 40
	if max <= 0 {
		return ""
	}
	n := int(v / max * width)
	if n == 0 && v > 0 {
		n = 1
	}
	return strings.Repeat("█", n)
}

func humanBytes(b uint64) string {
	const unit = 1024
	if b < unit {
		return fmt.Sprintf("%d B", b)
	}
	div, exp := uint64(unit), 0
	for n := b / unit; n >= unit; n /= unit {
		div *= unit
		exp++
	}
	return fmt.Sprintf("%.1f %cB", float64(b)/float64(div), "KMGTPE"[exp])
}

func group(n int) string {
	s := strconv.Itoa(n)
	neg := ""
	if strings.HasPrefix(s, "-") {
		neg, s = "-", s[1:]
	}
	var b strings.Builder
	for i, c := range s {
		if i > 0 && (len(s)-i)%3 == 0 {
			b.WriteByte(',')
		}
		b.WriteRune(c)
	}
	return neg + b.String()
}
