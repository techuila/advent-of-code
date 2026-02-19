package day02

import (
	"strconv"
	"strings"
)

// --- Day 2: Gift Shop ---
func SolvePart1(input []string) int {
	var sum = 0

	for _, line := range input {
		var s_range = strings.Split(line, ",")

		for _, r := range s_range {
			var parts = strings.Split(r, "-")

			if len(parts[0])%2 != 0 && len(parts[1])%2 != 0 {
				continue
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
		}
	}

	return sum
}

// func SolvePart2(input []string) int {
// }
