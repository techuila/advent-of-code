package day01

import (
	"os"
	"strings"
	"testing"
)

func TestSolveExample(t *testing.T) {
	data, _ := os.ReadFile("testdata/example.txt")

	result := SolvePart1(strings.Split(string(data), "\n"))

	expected := int(3)

	if result != expected {
		t.Errorf("Expected %d but got %d", expected, result)
	}
}

func TestSolvePart1(t *testing.T) {
	data, _ := os.ReadFile("testdata/input_1.txt")

	result := SolvePart1(strings.Split(string(data), "\n"))

	expected := int(1172)

	if result != expected {
		t.Errorf("Expected %d but got %d", expected, result)
	}
}
