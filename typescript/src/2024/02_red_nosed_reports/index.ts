import { AOC } from "@utils/types";

const options = {
  INCREASING: "increasing",
  DECREASING: "decreasing",
  NOT_SAFE: "not_safe",
} as const;

type Options = (typeof options)[keyof typeof options] | undefined;

export class RedNosedReports implements AOC {
  solution_1(inputs: string[]) {
    let total_safe = 0;

    for (const input of inputs) {
      const input_arr = input.split(" ").map((i) => Number(i));
      let level_is: Options;

      for (let i = 0; i < input_arr.length; i++) {
        level_is = this.checkLevel(input_arr, i, level_is);
        if (level_is === options.NOT_SAFE) {
          break;
        }

        if (i < input_arr.length - 1) {
          const diff = input_arr[i + 1] - input_arr[i];
          if (Math.abs(diff) > 3 || Math.abs(diff) === 0) {
            break;
          }
        } else {
          total_safe++;
        }
      }
    }

    return total_safe;
  }

  solution_2(inputs: string[]) {}

  checkLevel = (
    input_arr: number[],
    index: number,
    level_is: Options | undefined,
  ) => {
    if (index === input_arr.length - 1) {
      return level_is;
    }

    const _level_is =
      input_arr[index + 1] > input_arr[index]
        ? options.INCREASING
        : options.DECREASING;

    if (level_is !== undefined) {
      if (level_is !== _level_is) {
        return options.NOT_SAFE;
      }
    }

    return _level_is;
  };
}
