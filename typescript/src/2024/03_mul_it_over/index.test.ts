import { MulItOver } from ".";
import { Inputs } from "@utils/inputs";

const mulItOver = new MulItOver();
const get_inputs = Inputs(__dirname);

describe("Tests for Advent of code 2024, day 3: Mul It Over", () => {
  describe("Test Examples", () => {
    test("Test from example 1, it should return 161", () => {
      const inputs = get_inputs("example1.txt");

      const result = mulItOver.solution_1(inputs);

      expect(result).toEqual(161);
    });
  });

  describe("Test Solutions", () => {
    test("Test from solution 1, it should return 183_669_043", () => {
      const inputs = get_inputs("inputs.txt");

      const result = mulItOver.solution_1(inputs);

      console.log(result);
      expect(result).toEqual(183_669_043);
    });

    test("Test from solution 2, it should return 621", () => {
      const inputs = get_inputs("inputs.txt");
      const result = mulItOver.solution_2(inputs);
      expect(result).toEqual(621);
    });
  });
});
