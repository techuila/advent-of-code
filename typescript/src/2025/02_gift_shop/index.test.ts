import { GiftShop } from ".";
import { Inputs } from "@utils/inputs";

const giftShop = new GiftShop();
const get_inputs = Inputs(__dirname);

describe("Tests for Advent of code 2025, day2: Gift Shop", () => {
  describe("Test Examples", () => {
    const inputs = get_inputs("example.txt");

    test("[Solution 1] Test from example, it should return 1_227_775_554", () => {
      const result = giftShop.solution_1(inputs);

      expect(result).toEqual(1_227_775_554);
    });

    // test("[Solution 2] Test from example, it should return 6", () => {
    //   const result = giftShop.solution_2(inputs);

    //   expect(result).toEqual(6);
    // });
  });

  describe("Test Solutions", () => {
    const inputs = get_inputs("input_1.txt");

    test("[Solution 1] Test from solution, it should return 31_210_613_313", () => {
      const result = giftShop.solution_1(inputs);

      expect(result).toEqual(31_210_613_313);
    });

    // test("[Solution 2] Test from solution, it should return 6_932", () => {
    //   const result = giftShop.solution_2(inputs);

    //   expect(result).toEqual(6_932);
    // });
  });
});
