package day01

import (
	"strconv"
)

// --- Day 1: Secret Entrance ---
func SolvePart1(input []string) int {
	var start = 50
	var answer int

	for _, rotation := range input {
		var dir int
		l_r := rotation[0]
		turns, _ := strconv.Atoi(rotation[1:])

		if l_r == 'L' {
			dir = -1
		} else {
			dir = 1
		}

		dial_pointer := (100 + (start+dir*turns)%100) % 100
		start = dial_pointer

		if dial_pointer == 0 {
			answer++
		}
	}

	return answer
}
