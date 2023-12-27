defmodule AOC2023.Day01 do
  @moduledoc """
  Advent of code 2023, day 1: Trebuchet?!
  """

  require AOC

  @doc """
  Solve part 1
  """
  def part1(lines) do
    lines
    |> Enum.reduce(0, fn line, acc ->
      String.replace(line, ~r/[^0-9]/, "")
      |> then(fn x -> String.to_integer(String.at(x, 0) <> String.at(x, -1)) end)
      |> Kernel.+(acc)
    end)
  end

  def main(args) do
    Enum.map(args, fn path -> AOC.solve(path, &part1/1) end)
  end
end
