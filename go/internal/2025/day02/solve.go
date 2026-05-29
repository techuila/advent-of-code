package day02

import (
	"strconv"
	"strings"
)

// --- Day 2: Gift Shop ---
func SolvePart1(input []string) int {
	var sum = 0

	parseRangeAndLoopInput(input, func(parts []string) {
		if len(parts[0])%2 != 0 && len(parts[1])%2 != 0 {
			return
		}

		left, _ := strconv.Atoi(parts[0])
		right, _ := strconv.Atoi(parts[1])

		for n := left; n <= right; n++ {
			s_num := strconv.Itoa(n)
			idx := len(s_num) / 2

			if s_num[idx:] == s_num[:idx] {
				sum += n
			}
		}
	})
	return sum
}

func SolvePart2(input []string) int {
	var sum = 0

	parseRangeAndLoopInput(input, func(parts []string) {
		left, _ := strconv.Atoi(parts[0])
		right, _ := strconv.Atoi(parts[1])

		for n := left; n <= right; n++ {
			s_num := strconv.Itoa(n)

			if mirror(s_num) {
				sum += n
			}
		}
	})

	return sum
}

func parseRangeAndLoopInput(input []string, cb func(s_range []string)) {
	for _, line := range input {
		var s_range = strings.Split(line, ",")
		for _, r := range s_range {
			var parts = strings.Split(r, "-")
			cb(parts)
		}
	}
}

var patterns = map[int][][]int{
	2:  {{0, 0}},
	3:  {{0, 0, 0}},
	4:  {{0, 0, 0, 0}, {0, 1, 0, 1}},
	5:  {{0, 0, 0, 0, 0}},
	6:  {{0, 0, 0, 0, 0, 0}, {0, 1, 0, 1, 0, 1}, {0, 1, 2, 0, 1, 2}},
	7:  {{0, 0, 0, 0, 0, 0, 0}},
	8:  {{0, 0, 0, 0, 0, 0, 0, 0}, {0, 1, 0, 1, 0, 1, 0, 1}, {0, 1, 2, 3, 0, 1, 2, 3}},
	9:  {{0, 0, 0, 0, 0, 0, 0, 0, 0}, {0, 1, 2, 0, 1, 2, 0, 1, 2}},
	10: {{0, 0, 0, 0, 0, 0, 0, 0, 0, 0}, {0, 1, 0, 1, 0, 1, 0, 1, 0, 1}, {0, 1, 2, 3, 4, 0, 1, 2, 3, 4}},
}

func mirror(s_num string) bool {
	pattern_group := patterns[len(s_num)]
	for _, pattern := range pattern_group {
		matches := true
		for i, p := range pattern {
			if s_num[i] != s_num[p] {
				matches = false
				break
			}
		}
		if matches {
			return true
		}
	}

	return false
}
