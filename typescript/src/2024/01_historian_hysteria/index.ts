import { AOC } from "@utils/types";

export class HistorianHysteria implements AOC {
  solution_1(inputs: string[]) {
    let total_distance = 0;
    let { left, right } = this.getPairs(inputs);
    left = left.sort();
    right = right.sort();

    for (let i = 0; i < left.length; i++) {
      total_distance += Math.abs(left[i] - right[i]);
    }

    return total_distance;
  }

  solution_2(inputs: string[]) {
    // 1. Get total of duplicate numbers of each number from the left array to the right array
    // 2. Multiply the total of duplicate numbers by the number itself
    // 3. Sum the result of each number
    let { left, right } = this.getPairs(inputs);

    const result = left.reduce((sum, leftNumber) => {
      return (sum +=
        Number(leftNumber) *
        right.filter((rightNumber) => rightNumber == leftNumber).length);
    }, 0);

    return result;
  }

  getPairs(inputs: string[]) {
    return inputs.reduce(
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
  }
}
