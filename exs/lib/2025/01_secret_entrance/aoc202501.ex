defmodule AOC2025.Day01 do
	@moduledoc """
	Advent of code 2025, day 1: Secret Entrance
	"""

	require AOC

	@doc """
	Solve part 1
	"""
	def part1(lines) do
	  lines
		|> Enum.reduce({50, 0}, fn line, {position, zero_pointed} ->
		  new_position =
		    line
				|> getDirTurns()
				|> getDialPosition(position)

			if new_position === 0, do: {new_position, zero_pointed + 1}, else: {new_position, zero_pointed}
    end)
    |> elem(1)
	end

	@doc """
	Solve part 2
	"""
	def part2(lines) do
		lines
		|> Enum.reduce({50, 0}, fn line, {position, zero_passed_total} ->
	    turns = getDirTurns(line)
			zero_passed = countZeroPasses(turns, position)
      new_position = getDialPosition(turns, position)

      {new_position, zero_passed_total + zero_passed}
    end)
    |> elem(1)
	end

	@doc """
	Function from the text, get the direction and turns. R is positive, L is negative.

  ## Examples:
      iex> getDirTurns("R2")
      2
      iex> getDirTurns("L3")
      -3
	"""
	def getDirTurns(text) do
	  case String.at(text, 0) do
			"R" -> String.to_integer(String.slice(text, 1..-1//1))
			"L" -> String.to_integer(String.slice(text, 1..-1//1)) * -1
			end
	end

	@doc """
	Function to get the position of the dial from the turns (0-99).

  ## Examples:
      iex> getDialPosition(2, 50)
      52
      iex> getDialPosition(-3, 50)
      47
	"""
	def getDialPosition(turns, current_position) do
		rem(100 + rem(current_position + turns, 100), 100)
  end

  @doc """
  Function to count how many times the dial passed through 0

  ## Examples:
      iex> countZeroPasses(2, 50)
      0
      iex> countZeroPasses(-3, 50)
      0
      iex> countZeroPasses(-5, 0)
      0
      iex> countZeroPasses(48, 52)
      1
  """
  def countZeroPasses(turns, position) do
    steps_to_zero = if turns > 0, do: 100 - position, else: position
    steps_to_zero = if steps_to_zero === 0, do: 100, else: steps_to_zero


    if abs(turns) < steps_to_zero do
      0
    else
      1 + div(abs(turns) - steps_to_zero, 100)
    end
  end
end
