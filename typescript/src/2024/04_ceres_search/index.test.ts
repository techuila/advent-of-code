import { CeresSearch } from ".";
import { Inputs } from "@utils/inputs";

const ceresSearch = new CeresSearch();
const get_inputs = Inputs(__dirname);

describe("Tests for Advent of code 2024, day 4: Ceres Search", () => {
  describe("Test Examples", () => {
    test("Test from example 1, it should return 18", () => {
      const inputs = get_inputs("example1.txt");

      const result = ceresSearch.solution_1(inputs);

      expect(result).toEqual(18);
    });

    test("Test from example 2, it should return __", () => {
      //const inputs = get_inputs("example2.txt");
      //
      //const result = ceresSearch.solution_2(inputs);
      //
      //expect(result).toEqual(48);
    });
  });

  describe("Test Solutions", () => {
    test("Test from solution 1, it should return __", () => {
      //const inputs = get_inputs("inputs.txt");
      //
      //const result = ceresSearch.solution_1(inputs);
      //
      //expect(result).toEqual(10);
    });

    test("Test from solution 2, it should return __", () => {
      //  const inputs = get_inputs("inputs.txt");
      //
      //  const result = ceresSearch.solution_2(inputs);
      //  console.log(result);
      //
      //  expect(result).toEqual(59_097_164);
    });
  });
});
