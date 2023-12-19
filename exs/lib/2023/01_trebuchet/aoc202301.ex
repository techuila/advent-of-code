defmodule AOC2023.Day01 do
  @moduledoc """
  Advent of code 2023, day 1: Trebuchet?!
  """

  require AOC

  @doc """
  Parse input
  """
  def parse(input), do: input |> String.split("\n", trim: true)

  @doc """
  Solve part 1
  """
  def part1(lines) do
    lines
  end

  def main(args) do
    Enum.map(args, fn path -> AOC.solve(path, &parse/1, &part1/1) end)
  end
end
