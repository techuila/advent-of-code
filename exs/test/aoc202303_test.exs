defmodule AOC2023.Day03.Test do
  @moduledoc """
  Tests for Advent of code 2023, day 3: Gear Ratios
  """

  use ExUnit.Case, async: true
  import AOC2023.Day03, only: [part1: 1, part2: 1]
  doctest(AOC2023.Day03, import: true)

  @input_dir "lib/2023/03_gear_ratios"
  setup_all do
    {:ok,
     [
       example1: @input_dir |> Path.join("example1.txt") |> AOC.read_text() |> AOC.parse(),
       input: @input_dir |> Path.join("inputs.txt") |> AOC.read_text() |> AOC.parse()
     ]}
  end

  @tag :parse
  test "parse example", %{example1: example1} do
    assert example1 === [
             "467..114..",
             "...*......",
             "..35..633.",
             "......#...",
             "617*......",
             ".....+.58.",
             "..592.....",
             "......755.",
             "...$.*....",
             ".664.598.."
           ]
  end

  @tag timeout: 600_000
  @tag :example
  test "part 1 | example", %{example1: example1} do
    assert part1(example1) === 4_361
  end

  # @tag :example
  # test "part 2 | example", %{example1: example1} do
  #   assert part2(example1) === 2_286
  # end

  @tag timeout: 600_000
  @tag :solution
  @tag :year2023
  @tag :day3
  test "part 1 solved", %{input: input} do
    assert part1(input) === 527_144
  end

  # @tag :solution
  # @tag :year2023
  # @tag :day3
  # test "part 2 solved", %{input: input} do
  #   assert part2(input) === 67_363
  # end
end
