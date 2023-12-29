defmodule AOC2023.Day03 do
  @moduledoc """
  Advent of code 2023, day 3: Gear Ratios
  """

  require AOC

  @doc """
  Solve part 1
  """
  def part1(lines) do
    lines
    |> Enum.map(&String.graphemes/1)
    |> MatrixTraversal.do_row_wise_traverse(&get_adjacent_number_symbol/5)
    |> Enum.sum()
  end

  @doc """
  Solve part 2
  """
  def part2(lines) do
    lines
  end

  @spec get_adjacent_number_symbol(
          String.t(),
          list(integer()),
          integer(),
          integer(),
          list(list(String.t()))
        ) ::
          list(integer())
  def get_adjacent_number_symbol(el, acc, row, col, matrix) do
    cond do
      is_symbol?(el) and is_digit?(MatrixTraversal.get_element_at(matrix, row, col - 1)) and
          col > 0 ->
        acc ++ [String.to_integer(get_digits(row, col - 1, matrix))]

      is_digit?(MatrixTraversal.get_element_at(matrix, row, col)) and
          col + 1 == length(Enum.at(matrix, row)) ->
        concat_numbers = get_digits(row, col, matrix)

        acc ++
          do_boundary_traverse(
            row,
            col + 1,
            concat_numbers,
            matrix
          )

      el === "." and is_digit?(MatrixTraversal.get_element_at(matrix, row, col - 1)) and col > 0 ->
        concat_numbers = get_digits(row, col - 1, matrix)

        acc ++
          do_boundary_traverse(
            row,
            col,
            concat_numbers,
            matrix
          )

      true ->
        acc
    end
  end

  defp do_boundary_traverse(row, col, concat_numbers, matrix) do
    MatrixTraversal.do_boundary_traverse(
      row,
      col,
      1,
      String.length(concat_numbers),
      matrix,
      &row_callback(&1, &2, row, col, matrix),
      &col_callback(&1, &2, row, col, matrix)
    )
  end

  defp row_callback(left, right, row, col, matrix) do
    if is_symbol?(left) or is_symbol?(right) do
      [String.to_integer(get_digits(row, col - 1, matrix))]
    else
      []
    end
  end

  defp col_callback(top, bottom, row, col, matrix) do
    if is_symbol?(top) or is_symbol?(bottom) do
      [String.to_integer(get_digits(row, col - 1, matrix))]
    else
      []
    end
  end

  defp get_digits(row, col, matrix) do
    col..0
    |> Enum.reduce_while("", fn current_col, acc ->
      el = matrix |> MatrixTraversal.get_element_at(row, current_col)

      if is_digit?(el) do
        {:cont, el <> acc}
      else
        {:halt, acc}
      end
    end)
  end

  defp is_digit?(char), do: List.first(String.to_charlist(char)) in ?0..?9
  defp is_symbol?(el), do: String.match?(el, ~r/[^0-9.]/)
end

defmodule MatrixTraversal do
  def do_row_wise_traverse(matrix, callback) do
    matrix
    |> Enum.with_index()
    |> Enum.reduce([], fn {row, row_index}, acc ->
      row
      |> Enum.with_index()
      |> Enum.reduce(acc, &callback.(elem(&1, 0), &2, row_index, elem(&1, 1), matrix))
    end)
  end

  def do_boundary_traverse(row, col, n_row, n_col, matrix, row_callback, col_callback) do
    r_col = col
    l_col = col - (n_col + 1)
    t_row = row - n_row
    b_row = row + n_row

    left_right_list =
      Enum.map(0..n_row, fn row_index ->
        right = check_boundary(matrix, row + row_index, r_col)
        left = check_boundary(matrix, row - row_index, l_col)
        row_callback.(left, right)
      end)

    top_bottom_list =
      Enum.map(0..n_col, fn col_index ->
        top = check_boundary(matrix, t_row, col - col_index)
        bottom = check_boundary(matrix, b_row, col - col_index - 1)
        col_callback.(top, bottom)
      end)

    (left_right_list ++ top_bottom_list)
    |> List.flatten()
    |> Enum.uniq()
  end

  def get_element_at(matrix, row, col) do
    Enum.at(matrix, row)
    |> Enum.at(col)
  end

  defp check_boundary(matrix, row, col) do
    if -1 < row and row < length(matrix) and (-1 < col and col < length(Enum.at(matrix, row))),
      do: get_element_at(matrix, row, col),
      else: "."
  end
end
