import { AOC } from "@utils/types";

export class SecretEntrance implements AOC {
  solution_1(inputs: string[]) {
    let zerosPointed = 0;
    let position = 50;

    for (const input of inputs) {
      const turns = this.getDirTurns(input);

      position = (100 + ((turns + position) % 100)) % 100;

      if (position === 0) {
        zerosPointed++;
      }
    }

    return zerosPointed;
  }

  solution_2(inputs: string[]) {
    let zerosPassed = 0;
    let position = 50;

    for (const input of inputs) {
      const turns = this.getDirTurns(input);

      zerosPassed += this.countZerosPassed(turns, position);
      position = (100 + ((turns + position) % 100)) % 100;
    }

    return zerosPassed;
  }

  countZerosPassed(turns: number, position: number) {
    let stepsToZero = 0;

    if (turns > 0) {
      // Direction: Right
      stepsToZero = 100 - position;
    } else {
      // Direction: Left
      stepsToZero = position;
    }
    turns = Math.abs(turns);

    if (stepsToZero === 0) {
      stepsToZero = 100;
    }

    if (turns < stepsToZero) {
      return 0;
    }

    const ans = Math.floor(1 + (turns - stepsToZero) / 100);
    return ans;
  }
  getDirTurns(input: string) {
    // regex split the first character from the rest of the string
    const [dir, turns] = input.split(/(\d+)/);

    if (dir === "L") {
      return Number(-turns);
    }

    return Number(turns);
  }
}
