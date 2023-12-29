defmodule AOC2023.Day03 do
  @moduledoc """
  Advent of code 2023, day 3: Gear Ratios
  """

  import MatrixTraversal
  require AOC

  @doc """
  Solve part 1
  """
  def part1(lines) do
    lines
    |> Enum.map(&String.graphemes/1)
    |> matrix_traversal(&get_adjacent_number_symbol/2)
    |> Enum.sum()
  end

  @doc """
  Solve part 2
  """
  def part2(lines) do
    lines
  end

  @spec get_adjacent_number_symbol(String.t(), list(String.t())) :: list(integer())
  def get_adjacent_number_symbol(element, row) do
    char = List.first(String.to_charlist(element))

    cond do
      char >= ?0 and char <= ?9 ->
        nil

      element !== "." ->
        nil
    end
  end

  defp is_digit(char), do: char in ~c"0"..~c"9"
  defp is_symbol(char), do: String.match?(char, ~r/^[0-9.]/)
end

defmodule MatrixTraversal do
  def do_row_wise_traverse(matrix, callback) do
    matrix
    |> Enum.with_index()
    |> Enum.map(fn {row, row_index} ->
      row
      |> Enum.with_index()
      |> Enum.map(&callback.(elem(&1, 0), row_index, elem(&1, 1), matrix))
    end)
  end

  def do_boundary_traverse(row, col, n_row, n_col, matrix, row_callback, col_callback) do
    r_col = col
    l_col = col - (n_col - 1)
    t_row = row - (n_row - 1)
    b_row = row + (n_row - 1)

    Enum.map(0..n_row, fn row_index ->
      right = matrix |> get_element_at(row + row_index, r_col)
      left = matrix |> get_element_at(row - row_index, l_col)
      row_callback.(left, right)
    end)

    Enum.map(0..n_col, fn col_index ->
      top = matrix |> get_element_at(t_row, col - col_index)
      bottom = matrix |> get_element_at(b_row, col - col_index - 1)
      col_callback.(top, bottom)
    end)
  end

  defp get_element_at(matrix, row, col) do
    Enum.at(matrix, row)
    |> Enum.at(col)
  end
end
