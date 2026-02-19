defmodule AOC2025.Day02 do
  @moduledoc """
  Advent of code 2025, day 1: Gift Shop
  """

  require AOC

  @doc """
  Solve part 1
  """

  def part1(lines) do
    lines
    |> Enum.map(fn line -> String.split(line, ",", trim: true) end)
    |> Enum.flat_map(& &1)
    |> Enum.map(fn range ->
      [left, right] = String.split(range, "-", trim: true)
      left = String.to_integer(left)
      right = String.to_integer(right)
      left..right
    end)
    |> Stream.flat_map(& &1)
    |> Stream.filter(&invalid_p1?/1)
    |> Enum.sum()
  end

  @doc """
  Solve part 1
  """
  def part2(lines) do
  end

  defp invalid_p1?(n) do
     mirror?(Integer.digits(n))
   end

   defp mirror?([a, a]), do: true
   defp mirror?([a, b, a, b]), do: true
   defp mirror?([a, b, c, a, b, c]), do: true
   defp mirror?([a, b, c, d, a, b, c, d]), do: true
   defp mirror?([a, b, c, d, e, a, b, c, d, e]), do: true
   defp mirror?(_), do: false
end
