package day02

import (
	"os"
	"strings"
	"testing"
)

func TestSolveExample(t *testing.T) {
	data, _ := os.ReadFile("testdata/example.txt")

	result1 := SolvePart1(strings.Split(string(data), "\n"))
	result2 := SolvePart2(strings.Split(string(data), "\n"))

	expected1 := int(1_227_775_554)
	expected2 := int(4_174_379_265)

	if result1 != expected1 {
		t.Errorf("[Example 1] Expected %d but got %d", expected1, result1)
	}

	if result2 != expected2 {
		t.Errorf("[Example 2] Expected %d but got %d", expected2, result2)
	}
}

func TestSolvePart1(t *testing.T) {
	data, _ := os.ReadFile("testdata/input_1.txt")

	result := SolvePart1(strings.Split(string(data), "\n"))

	expected := int(31_210_613_313)

	if result != expected {
		t.Errorf("Expected %d but got %d", expected, result)
	}
}

func TestSolvePart2(t *testing.T) {
	data, _ := os.ReadFile("testdata/input_2.txt")

	result := SolvePart2(strings.Split(string(data), "\n"))

	expected := int(41_823_587_546)

	if result != expected {
		t.Errorf("Expected %d but got %d", expected, result)
	}
}
