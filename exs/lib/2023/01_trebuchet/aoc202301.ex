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

  @doc """
  Solve part 2
  """
  def part2(lines) do
    lines
    |> Enum.reduce(0, fn line, sum ->
      sum + find_first_digit(line) * 10 + find_last_digit(line)
    end)
  end

  @doc """
  Recursive function that finds the first text to integer

  ## Examples:

      iex> find_first_digit("2three")
      2
      iex> find_first_digit("adeight2")
      8
      iex> find_first_digit("lkuse2en")
      2
  """
  def find_first_digit(text) do
    case text do
      "one" <> _rest -> 1
      "two" <> _rest -> 2
      "three" <> _rest -> 3
      "four" <> _rest -> 4
      "five" <> _rest -> 5
      "six" <> _rest -> 6
      "seven" <> _rest -> 7
      "eight" <> _rest -> 8
      "nine" <> _rest -> 9
      <<char::utf8>> <> _rest when char >= ?1 and char <= ?9 -> char - ?0
      <<_char::utf8>> <> rest -> find_first_digit(rest)
    end
  end

  @doc """
  Recursive function that finds the last text to integer

  ## Examples:

      iex> find_last_digit("2three")
      3
      iex> find_last_digit("adeight2")
      2
      iex> find_last_digit("lkuse2en")
      2
  """
  def find_last_digit(text) do
    case String.reverse(text) do
      "eno" <> _rest -> 1
      "owt" <> _rest -> 2
      "eerht" <> _rest -> 3
      "ruof" <> _rest -> 4
      "evif" <> _rest -> 5
      "xis" <> _rest -> 6
      "neves" <> _rest -> 7
      "thgie" <> _rest -> 8
      "enin" <> _rest -> 9
      <<char::utf8>> <> _rest when char >= ?1 and char <= ?9 -> char - ?0
      <<_char::utf8>> <> rest -> find_last_digit(String.reverse(rest))
    end
  end

  def main(args) do
    Enum.map(args, fn path -> AOC.solve(path, &part1/1, &part2/1) end)
  end
end

# if line[x] != NaN -> str_to_digit(line[x])
# else
