package day02

import (
	"sort"
	"strconv"
)

// SolvePart2Optimal is an alternative to SolvePart2 that does NOT brute-force
// every integer inside every range. Instead it generates the (relatively few)
// "repeated-block" numbers directly, then answers each range with a binary
// search over a prefix-sum table.
//
// Cost is O(V + Q·log V) where V = count of valid numbers (~110k up to 10
// digits) and Q = number of ranges — independent of how wide the ranges are.
// The brute-force version is O(Σ range widths), which can be orders of
// magnitude larger.
func SolvePart2Optimal(input []string) int {
	type rng struct{ lo, hi int }

	var ranges []rng
	maxHi := 0

	parseRangeAndLoopInput(input, func(parts []string) {
		lo, _ := strconv.Atoi(parts[0])
		hi, _ := strconv.Atoi(parts[1])
		ranges = append(ranges, rng{lo, hi})
		if hi > maxHi {
			maxHi = hi
		}
	})

	// Only generate numbers as long as the widest value we might be asked about.
	maxLen := len(strconv.Itoa(maxHi))

	// A number is valid iff its L digits are a block of length d repeated L/d
	// times, for some proper divisor d of L (d < L). Generate every such number
	// by enumerating its primitive block. Different (L, d) pairs can produce the
	// same number (e.g. 111111), so dedup with a set.
	seen := make(map[int]struct{}, 1<<17)
	for L := 2; L <= maxLen; L++ {
		for d := 1; d < L; d++ {
			if L%d != 0 {
				continue
			}
			reps := L / d
			mul := pow10(d)
			// Blocks have no leading zero, so they range over all d-digit numbers.
			for block := pow10(d - 1); block < mul; block++ {
				num := 0
				for range reps {
					num = num*mul + block
				}
				seen[num] = struct{}{}
			}
		}
	}

	// Sorted values + prefix sums → each range is two binary searches.
	nums := make([]int, 0, len(seen))
	for v := range seen {
		nums = append(nums, v)
	}
	sort.Ints(nums)

	prefix := make([]int, len(nums)+1)
	for i, v := range nums {
		prefix[i+1] = prefix[i] + v
	}

	sum := 0
	for _, r := range ranges {
		lo := sort.SearchInts(nums, r.lo)    // first index >= lo
		hi := sort.SearchInts(nums, r.hi+1)  // first index > hi
		sum += prefix[hi] - prefix[lo]
	}
	return sum
}

func pow10(n int) int {
	p := 1
	for range n {
		p *= 10
	}
	return p
}
