defmodule AOC2025.Day01.Test do
	@moduledoc """
	Tests for Advent of code 2025, day 1: Secret Entrance
	"""

	use ExUnit.Case, async: true
	import AOC2025.Day01, only: [part1: 1, part2: 1]
	doctest(AOC2025.Day01, import: true)

	@input_dir "lib/2025/01_secret_entrance"
	setup_all do
		{:ok,
		[
		  example: @input_dir |> Path.join("example.txt") |> AOC.read_text() |> AOC.parse(),
			input1: @input_dir |> Path.join("input_1.txt") |> AOC.read_text() |> AOC.parse(),
			input2: @input_dir |> Path.join("input_2.txt") |> AOC.read_text() |> AOC.parse()
		]}
	end

 @tag :parse
  test "parse example", %{example: example} do
    assert example === [
      "L68",
      "L30",
      "R48",
      "L5",
      "R60",
      "L55",
      "L1",
      "L99",
      "R14",
      "L82"
    ]
  end

	@tag :ex
	test "part 1 | example", %{example: example} do
    assert part1(example) === 3
  end

  @tag :ex
	test "part 2 | example", %{example: example} do
     assert part2(example) === 6
   end

  @tag :solution
  @tag :year2025
  @tag :day1
  test "part 1 solved", %{input1: input1} do
    assert part1(input1) === 1_172
  end


  @tag :solution
  @tag :year2025
  @tag :day1
  test "part 2 solved", %{input2: input2} do
    assert part2(input2) === 6_932
  end
end
