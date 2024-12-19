import { HistorianHysteria } from ".";
import { Inputs } from "@utils/inputs";

const historianHistoria = new HistorianHysteria();
const get_inputs = Inputs(__dirname);

describe("Tests for Advent of code 2024, day1: Historian Historia", () => {
  describe("Test Examples", () => {
    test("Test from example 1, it should return 8", () => {
      const inputs = get_inputs("example1.txt");

      const result = historianHistoria.solution_1(inputs);

      expect(result).toEqual(11);
    });
  });

  describe("Test Solutions", () => {
    test("Test from solution 1, it should return 936_063", () => {
      const inputs = get_inputs("inputs.txt");

      const result = historianHistoria.solution_1(inputs);
      expect(result).toEqual(936_063);
    });

    test("Test from solution 2, it should return 67_363", () => {
      const inputs = get_inputs("inputs.txt");

      const result = historianHistoria.solution_2(inputs);
      console.log(result);
    });
  });
});
