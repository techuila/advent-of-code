import { SecretEntrance } from ".";
import { Inputs } from "@utils/inputs";

const secretEntrance = new SecretEntrance();
const get_inputs = Inputs(__dirname);

describe("Tests for Advent of code 2025, day1: Secret Entrance", () => {
  describe("Test Examples", () => {
    const inputs = get_inputs("example.txt");

    test("[Solution 1] Test from example, it should return 3", () => {
      const result = secretEntrance.solution_1(inputs);

      expect(result).toEqual(3);
    });

    test("[Solution 2] Test from example, it should return 6", () => {
      const result = secretEntrance.solution_2(inputs);

      expect(result).toEqual(6);
    });
  });

  describe("Test Solutions", () => {
    const inputs = get_inputs("input_1.txt");

    test("[Solution 1] Test from solution, it should return 1_172", () => {
      const result = secretEntrance.solution_1(inputs);

      expect(result).toEqual(1_172);
    });

    test("[Solution 2] Test from solution, it should return 6_932", () => {
      const result = secretEntrance.solution_2(inputs);

      expect(result).toEqual(6_932);
    });
  });
});
