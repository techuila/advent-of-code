package day01

import (
	"strconv"
)

// --- Day 1: Secret Entrance ---
func SolvePart1(input []string) int {
	var start = 50
	var answer int

	for _, rotation := range input {
		dir, turns := getDirTurns(rotation)

		dialPointer := (100 + (start+dir*turns)%100) % 100
		start = dialPointer

		if dialPointer == 0 {
			answer++
		}
	}

	return answer
}

func SolvePart2(input []string) int {
	var start = 50
	var answer int

	for _, rotation := range input {
		dir, turns := getDirTurns(rotation)

		dialPointer := getDialPosition(start, dir, turns)
		zerosPassed := countZerosPassed(start, dir, turns)

		if zerosPassed >= 1 {
			answer += zerosPassed
		}

		start = dialPointer
	}

	return answer
}

func countZerosPassed(start int, dir int, turns int) int {
	var stepsToZero int

	if dir > 0 { // Right direction
		stepsToZero = (100 - start)
	} else { // Left direction
		stepsToZero = start
	}

	if stepsToZero == 0 {
		stepsToZero = 100
	}

	if turns < stepsToZero {
		return 0
	}

	return 1 + (turns-stepsToZero)/100
}

func getDialPosition(start int, dir int, turns int) int {
	dirTurns := dir * turns
	return (100 + (start+dirTurns)%100) % 100
}

func getDirTurns(rotation string) (int, int) {
	var dir int
	lr := rotation[0]
	turns, _ := strconv.Atoi(rotation[1:])

	if lr == 'L' {
		dir = -1
	} else {
		dir = 1
	}

	return dir, turns
}
