defmodule AOC2023.Day02 do
  @moduledoc """
  Advent of code 2023, day 2: Cube Conundrum
  """

  require AOC

  @type cube_color :: :red | :green | :blue
  @type id :: integer()
  @type pull :: %{optional(cube_color) => integer()}
  @type game :: %{pulls: list(pull), maxes: pull()}
  @type games :: %{id() => game()}

  @bag_contents %{red: 12, green: 13, blue: 14}

  @doc """
  Solve part 1
  """
  def part1(lines) do
    lines
    |> Enum.map(&parse_game/1)
    |> Map.new()
    |> find_possible_games()
    |> Enum.sum()
  end

  @doc """
  Solve part 2
  """

  def part2(lines) do
    lines
    |> Enum.map(&parse_game/1)
    |> Map.new()
    |> get_product_of_cubes()
    |> Enum.sum()
  end

  @spec find_possible_games(games()) :: list(integer())
  def find_possible_games(games) do
    games
    |> Enum.reduce([], fn {id, game}, acc ->
      if is_game_possible?(game), do: [id | acc], else: acc
    end)
  end

  @spec get_product_of_cubes(games()) :: integer()
  def get_product_of_cubes(games) do
    games
    |> Enum.map(fn {_id, game} ->
      Enum.reduce(game[:maxes], 1, fn {_color, count}, acc -> count * acc end)
    end)
  end

  @spec is_game_possible?(game()) :: boolean()
  def is_game_possible?(game) do
    maxes = game[:maxes]

    maxes
    |> Enum.all?(fn {color, count} -> count <= @bag_contents[color] end)
  end

  @spec parse_game(list(String.t())) :: {id(), game()}
  def parse_game(game) do
    ["Game " <> id, raw_game] = String.split(game, ": ")
    pulls = parse_pulls(raw_game)
    {String.to_integer(id), %{pulls: pulls, maxes: find_maxes(pulls)}}
  end

  @spec find_maxes(list(pull())) :: pull()
  def find_maxes(pulls) do
    pulls
    |> Enum.reduce(%{}, fn pull, acc ->
      Map.merge(acc, pull, fn _key, v1, v2 -> max(v1, v2) end)
    end)
  end

  @spec parse_pulls(String.t()) :: list(pull())
  def parse_pulls(raw_game) do
    raw_game
    |> String.split("; ", trim: true)
    |> Enum.map(&parse_pull/1)
  end

  @spec parse_pull(String.t()) :: pull()
  def parse_pull(raw_pull) do
    raw_pull
    |> String.split(", ")
    |> Enum.map(&parse_cube/1)
    |> Map.new()
  end

  @spec parse_cube(String.t()) :: {cube_color(), integer()}
  def parse_cube(raw_cube) do
    [count, color] = String.split(raw_cube, " ")
    {String.to_atom(color), String.to_integer(count)}
  end

  def main(args) do
    Enum.map(args, fn path -> AOC.solve(path, &part1/1, &part2/1) end)
  end
end

# if line[x] != NaN -> str_to_digit(line[x])
# else
