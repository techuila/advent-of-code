import { AOC } from "@utils/types";

export class CeresSearch implements AOC {
  solution_1(inputs: string[]) {
    const FIND_WORD = "XMAS";
    const matrix = new Matrix(this.convertToMatrix(inputs));

    // @TODO:
    // 1. Traverse all direction and find the matched word
    //  1.a. If the character is found in the FIND_WORD, return true
    //  1.b. If the character is not found, return false
    // 2. Increment the count of the matched word if word is found
    // 3. Return the count of the matched word
    matrix.traverse((row, col, val) => {
      if (val === FIND_WORD[0]) {
        // matrix.horizontalTraverse(row, col, (index, left_value, right_value) => {});
        // matrix.verticalTraverse(row, col);
        // matrix.diagonalTraverse(row, col);
        // matrix.antiDiagonalTraverse(row, col);
      }
    });
  }

  solution_2(inputs: string[]) {}

  convertToMatrix(inputs: string[]) {
    return inputs.map((e) => e.split(""));
  }
}

class Matrix {
  private matrix: string[][];

  constructor(matrix: string[][]) {
    this.matrix = matrix;
  }

  loop(cb: (index: number) => boolean) {
    for (let i = 1; ; i++) {
      const is_continue = cb(i);

      if (!is_continue) {
        break;
      }
    }
  }

  horizontalTraverse(
    row: number,
    col: number,
    cb: (index: number, left_value: string, right_value: string) => boolean
  ) {
    this.loop((i) =>
      cb(i, this.matrix[row][col - i], this.matrix[row][col + i])
    );
  }

  verticalTraverse(
    row: number,
    col: number,
    cb: (index: number, left_value: string, right_value: string) => boolean
  ) {
    this.loop((i) =>
      cb(i, this.matrix[row - 1][col], this.matrix[row + i][col])
    );
  }

  diagonalTraverse(
    row: number,
    col: number,
    cb: (index: number, left_value: string, right_value: string) => boolean
  ) {
    this.loop((i) =>
      cb(i, this.matrix[row + i][col - i], this.matrix[row - i][col + i])
    );
  }

  antiDiagonalTraverse(
    row: number,
    col: number,
    cb: (index: number, left_value: string, right_value: string) => boolean
  ) {
    this.loop((i) =>
      cb(i, this.matrix[row - i][col - i], this.matrix[row + i][col + i])
    );
  }

  traverse(cb: (row: number, column: number, value: string) => void) {
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[i].length; j++) {
        cb(i, j, this.matrix[i][j]);
      }
    }
  }
}
