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

  solution_2(inputs: string[]) {
    function verify(input_arr: number[], exclude_index?: number): number {
      let nums = [...input_arr];
      if (exclude_index !== undefined) {
        nums.splice(exclude_index, 1);
      }

      const is_increasing = nums[1] - nums[0] > 0;
      let is_safe = true;

      for (let i = 1; i < nums.length; i++) {
        const diff = nums[i] - nums[i - 1];

        if ((is_increasing && diff <= 0) || Math.abs(diff) > 3) {
          is_safe = false;
          break;
        }

        if ((!is_increasing && diff >= 0) || Math.abs(diff) > 3) {
          is_safe = false;
          break;
        }
      }

      if (!is_safe && exclude_index === undefined) {
        nums.forEach((_, index) => {
          is_safe ||= Boolean(verify(input_arr, index));
        });
      }

      return is_safe ? 1 : 0;
    }

    return inputs.reduce(
      (total_safe, input) =>
        (total_safe += verify(input.split(" ").map(Number))),
      0,
    );
  }

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
