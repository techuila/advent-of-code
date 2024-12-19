import { CubeCunundrum } from ".";
import { Inputs } from "@utils/inputs";

const cubeCunundrum = new CubeCunundrum();
const get_inputs = Inputs(__dirname);

describe("Tests for Advent of code 2023, day 1: Trebuchet?!", () => {
  describe("Test Examples", () => {
    test("Test from example 1, it should return 8", () => {
      const inputs = get_inputs("example1.txt");

      const sum = cubeCunundrum.solution_1(inputs);

      expect(sum).toEqual(8);
    });

    test("Test from example 2, it should return 2_286", () => {
      const inputs = get_inputs("example1.txt");

      const sum = cubeCunundrum.solution_2(inputs);

      expect(sum).toEqual(2_286);
    });
  });

  describe("Test Solutions", () => {
    test("Test from solution 1, it should return 2_528", () => {
      const inputs = get_inputs("inputs.txt");

      const sum = cubeCunundrum.solution_1(inputs);

      expect(sum).toEqual(2_528);
    });

    test("Test from solution 2, it should return 67_363", () => {
      const inputs = get_inputs("inputs.txt");

      const sum = cubeCunundrum.solution_2(inputs);

      expect(sum).toEqual(67_363);
    });
  });
});
