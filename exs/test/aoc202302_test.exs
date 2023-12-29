defmodule AOC2023.Day02.Test do
  @moduledoc """
  Tests for Advent of code 2023, day 2: Cube Conundrum
  """

  use ExUnit.Case, async: true
  import AOC2023.Day02, only: [parse_game: 1, part1: 1, part2: 1]
  doctest(AOC2023.Day02, import: true)

  @input_dir "lib/2023/02_cube_conundrum"
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
             "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
             "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
             "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
             "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
             "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"
           ]
  end

  @tag :parse
  test "should parse game with multiple colors in a pull" do
    game = "Game 1: 2 red, 3 green, 4 blue; 1 red, 2 green, 3 blue"

    expected =
      {1,
       %{
         pulls: [%{red: 2, green: 3, blue: 4}, %{red: 1, green: 2, blue: 3}],
         maxes: %{red: 2, green: 3, blue: 4}
       }}

    assert parse_game(game) === expected
  end

  @tag :example
  test "part 1 | example", %{example1: example1} do
    assert part1(example1) === 8
  end

  @tag :example
  test "part 2 | example", %{example1: example1} do
    assert part2(example1) === 2_286
  end

  @tag :solution
  @tag :year2023
  @tag :day2
  test "part 1 solved", %{input: input} do
    assert part1(input) === 2_528
  end

  @tag :solution
  @tag :year2023
  @tag :day2
  test "part 2 solved", %{input: input} do
    assert part2(input) === 67_363
  end
end
