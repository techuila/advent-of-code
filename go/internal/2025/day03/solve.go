package day02

import (
	"strconv"
)

// --- Day 3: Lobby ---
func SolvePart1(input []string) int {
	result := 0

	for _, line := range input {
		n, _ := strconv.Atoi(string(line[0]))
		highest := [2]int{0, n}
		sec_highest := [2]int{0, 0}

		for i := 1; i < len(line); i++ {
			num, _ := strconv.Atoi(string(line[i]))

			if i != len(line)-1 && highest[1] < num {
				highest = [2]int{i, num}
				sec_highest = [2]int{0, 0}
			} else {
				if highest[1]-num < highest[1]-sec_highest[1] {
					sec_highest = [2]int{i, num}
				}
			}
		}

		if highest[0] > sec_highest[0] {
			result = result + (10*sec_highest[1] + highest[1])
		} else {
			result = result + (10*highest[1] + sec_highest[1])
		}
	}

	return result
}

func SolvePart2(input []string) int {
	return 0
}
