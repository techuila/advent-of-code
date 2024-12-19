import { AOC } from "@utils/types";

export class CubeCunundrum implements AOC {
  bag_contents: Record<string, number> = { red: 12, green: 13, blue: 14 };
  constructor() {}

  solution_1(inputs: string[]) {
    const games = this.get_max_cubes(inputs);
    console.log(games);

    const sum = games
      .filter(({ max_cubes }) => {
        return Object.entries(max_cubes).every(
          ([color, count]) => count <= this.bag_contents[color],
        );
      })
      .map(({ id }) => id)
      .reduce((a, b) => a + b, 0);

    return sum;
  }

  solution_2(inputs: string[]) {
    const games = this.get_max_cubes(inputs);

    const product_of_cubes = games.map(({ max_cubes }) =>
      Object.entries(max_cubes).reduce((acc, [_, count]) => acc * count, 1),
    );

    const sum = product_of_cubes.reduce((a, b) => a + b, 0);

    return sum;
  }

  get_max_cubes(inputs: string[]) {
    return inputs.map((input) => {
      const [_id, pulls] = input.trim().split(": ");
      const id = +_id.split(" ")[1];
      const max_cubes = pulls
        .split("; ")
        .reduce((acc: Record<string, number>, pull) => {
          const cubes = pull.split(", ").reduce((cube_acc, _cube) => {
            const cube = _cube.split(" ");
            return (cube_acc = { ...cube_acc, [cube[1]]: cube[0] });
          }, {}) as Record<string, number>;

          Object.entries(cubes).forEach(([color, count]) => {
            if (acc[color]) {
              acc[color] = Math.max(acc[color], count);
            } else {
              acc[color] = count;
            }
          });

          return acc;
        }, {});

      return { id, max_cubes };
    });
  }
}
