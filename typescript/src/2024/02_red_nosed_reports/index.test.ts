import { RedNosedReports } from ".";
import { Inputs } from "@utils/inputs";

const redNosedReports = new RedNosedReports();
const get_inputs = Inputs(__dirname);

describe("Tests for Advent of code 2024, day 2: Red Nosed Reports", () => {
  describe("Test Examples", () => {
    test("Test from example 1, it should return 2", () => {
      const inputs = get_inputs("example1.txt");

      const result = redNosedReports.solution_1(inputs);

      expect(result).toEqual(2);
    });

    test("Test from example 1, it should return 4", () => {
      const inputs = get_inputs("example1.txt");

      const result = redNosedReports.solution_2(inputs);

      expect(result).toEqual(4);
    });
  });

  describe("Test Solutions", () => {
    test("Test from solution 1, it should return 591", () => {
      const inputs = get_inputs("inputs.txt");

      const result = redNosedReports.solution_1(inputs);
      expect(result).toEqual(591);
    });

    test("Test from solution 2, it should return 621", () => {
      const inputs = get_inputs("inputs.txt");

      const result = redNosedReports.solution_2(inputs);
      expect(result).toEqual(621);
    });
  });
});
