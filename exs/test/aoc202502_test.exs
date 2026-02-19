defmodule AOC2025.Day02.Test do
  @moduledoc """
  Tests for Advent of code 2025, day 1: Gift Shop
  """

  use ExUnit.Case, async: true
  import AOC2025.Day02,  only: [part1: 1, part2: 1]
  doctest(AOC2025.Day02, import: true)

  @input_dir "lib/2025/02_gift_shop"
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
      "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,",
      "1698522-1698528,446443-446449,38593856-38593862,565653-565659,",
      "824824821-824824827,2121212118-2121212124"
    ]
  end

  @tag :ex
	test "part 1 | example", %{example: example} do
    assert part1(example) === 1_227_775_554
  end

 #  @tag :ex
	# test "part 2 | example", %{example: example} do
 #    assert part2(example) === 6
 #  end

  @tag :solution
  @tag :year2025
  @tag :day1
  test "part 1 solved", %{input1: input1} do
    assert part1(input1) === 31_210_613_313
  end


  # @tag :solution
  # @tag :year2025
  # @tag :day1
  # test "part 2 solved", %{input2: input2} do
  #   assert part2(input2) === 6_932
  # end
end
