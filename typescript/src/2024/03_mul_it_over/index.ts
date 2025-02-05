import { AOC } from "@utils/types";

export class MulItOver implements AOC {
  solution_1(inputs: string[]) {
    let sum = 0;

    for (const input of inputs) {
      const muls = input.match(/mul\(\d{1,3}\,\d{1,3}\)/g) ?? [];

      for (const mul of muls) {
        const nums = mul.match(/\d{1,3}/g)!.map((i) => Number(i));
        const result = nums[0] * nums[1];
        sum += result;
      }
    }

    return sum;
  }

  solution_2(inputs: string[]) {
    let sum = 0;
    let do_action = true;

    for (const input of inputs) {
      const muls =
        input.match(/(mul\(\d{0,3}\,\d{0,3}\)|don\'t\(\)|do\(\))/g) ?? [];

      for (const mul of muls) {
        if (mul === "don't()") {
          do_action = false;
          continue;
        } else if (mul === "do()") {
          do_action = true;
          continue;
        } else {
          if (!do_action) continue;
        }

        const nums = mul.match(/\d{1,3}/g)!.map((i) => Number(i));
        const result = nums[0] * nums[1];
        sum += result;
      }
    }

    return sum;
  }
}
