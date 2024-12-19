import { AOC } from "@utils/types";

export class HistorianHysteria implements AOC {
  solution_1(inputs: string[]) {
    let total_distance = 0;
    let { left, right } = inputs.reduce(
      (acc, currentValue) => {
        if (!acc) {
          acc = { left: [], right: [] };
        }

        const [left, right] = currentValue.split("   ");

        return (acc = {
          left: acc.left.concat([Number(left)]),
          right: acc.right.concat([Number(right)]),
        });
      },
      { left: [], right: [] } as { left: number[]; right: number[] },
    );

    left = left.sort();
    right = right.sort();

    for (let i = 0; i < left.length; i++) {
      total_distance += Math.abs(left[i] - right[i]);
    }

    return total_distance;
  }

  solution_2(inputs: string[]) {}
}
