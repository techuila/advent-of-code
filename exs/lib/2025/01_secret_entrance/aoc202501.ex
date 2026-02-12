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
	    {pos, zero_passed} =
        line
        |> getDirTurns()
        |> getDialPosition(position)
        |> countZeroPasses(getDirTurns(line))

        {pos, zero_passed_total + zero_passed}
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
      iex> countZeroPasses(50, 2)
      {50, 0}
      iex> countZeroPasses(50, -3)
      {50, 0}
      iex> countZeroPasses(50, 51)
      {50, 1}
      iex> countZeroPasses(50, -50)
      {50, 1}
  """
  def countZeroPasses(position, turns) do
    steps_to_zero = if turns > 0, do: 100 - position, else: position
    if steps_to_zero === 0 do
      steps_to_zero = 100
    end


    if abs(turns) < steps_to_zero do
      { position, 0 }
    else
      { position, 1 + div(abs(turns) - steps_to_zero, 100) }
    end
  end
end
