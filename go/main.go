package main

const (
	one = 1 << iota
	two
	four
)

func main() {
	numbers := one | two
	println(numbers & 4)
}
