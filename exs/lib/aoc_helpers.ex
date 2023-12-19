defmodule AOC do
  @moduledoc """
  Advent of Code helper functions and macros
  """

  defmacro __using__(_) do
    quote do
      import AOC
    end
  end

  @doc """
  Read text from the given path.
  """
  def read_text(path) do
    with {:ok, content} <- File.read(path), do: content |> String.trim_trailing()
  end

  @doc """
  Solve one AOC puzzle given input path and parse(), part1(), and part2() functions.
  """
  def solve(path, parse_func, part1_func) do
    IO.puts("\n#{path}:")

    input = read_text(path) |> parse_func.()
    input |> part1_func.() |> IO.puts()
  end
end
