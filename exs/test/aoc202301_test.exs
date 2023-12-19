defmodule AOC2023.Day01.Test do
  @moduledoc """
  Tests for Advent of code 2023, day 1: Trebuchet?!
  """

  use ExUnit.Case, async: true
  import AOC2023.Day01, only: [parse: 1, part1: 1]
  doctest AOC2023.Day01

  @input_dir "lib/2023/01_trebuchet"
  setup_all do
    {:ok,
     [
       example1: @input_dir |> Path.join("example1.txt") |> AOC.read_text() |> parse()
     ]}
  end

  @tag :parse
  test "parse example", %{example1: example1} do
    assert example1 === ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"]
  end

  @tag :example
  test "part 1 | example 1", %{example1: example1} do
    assert part1(example1) === 142
  end
end
