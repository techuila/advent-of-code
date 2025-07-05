import { AOC } from "@utils/types";

export class CeresSearch implements AOC {
  solution_1(inputs: string[]) {
    const FIND_WORD = "XMAS";
    const matrix = new Matrix(this.convertToMatrix(inputs));
    let words_found = 0;

    matrix.traverse((row, col, val) => {
      if (val === FIND_WORD[0]) {
        matrix.horizontalTraverse(row, col, find_word);
        matrix.verticalTraverse(row, col, find_word);
        matrix.diagonalTraverse(row, col, find_word);
        matrix.antiDiagonalTraverse(row, col, find_word);
      }
    });

    function find_word(_: number, left_str: string, right_str: string) {
      let is_continue = false;

      if (FIND_WORD.startsWith(left_str)) {
        is_continue = true;
        if (left_str === FIND_WORD) {
          words_found++;
          is_continue = false;
        }
      }

      if (FIND_WORD.startsWith(right_str)) {
        is_continue = true;
        if (right_str === FIND_WORD) {
          words_found++;
          is_continue = false;
        }
      }

      if (!is_continue) {
        return false;
      }

      return true;
    }

    console.log(`Words found: ${words_found}`);
    return words_found;
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
    let left_str = "X",
      right_str = "X";
    this.loop((i) => {
      left_str += -1 < col - i ? this.matrix[row][col - i] : " ";
      right_str +=
        this.matrix[row].length > col + i ? this.matrix[row][col + i] : " ";
      return cb(i, left_str, right_str);
    });
  }

  verticalTraverse(
    row: number,
    col: number,
    cb: (index: number, left_value: string, right_value: string) => boolean
  ) {
    let left_str = "X",
      right_str = "X";
    this.loop((i) => {
      left_str += -1 < row - i ? this.matrix[row - i][col] : " ";
      right_str +=
        this.matrix.length > row + i ? this.matrix[row + i][col] : " ";
      return cb(i, left_str, right_str);
    });
  }

  diagonalTraverse(
    row: number,
    col: number,
    cb: (index: number, left_value: string, right_value: string) => boolean
  ) {
    let left_str = "X",
      right_str = "X";
    this.loop((i) => {
      left_str +=
        -1 < row - i && -1 < col - i ? this.matrix[row - i][col - i] : " ";
      right_str +=
        this.matrix.length > row + i && this.matrix[row].length > col + i
          ? this.matrix[row + i][col + i]
          : " ";
      return cb(i, left_str, right_str);
    });
  }

  antiDiagonalTraverse(
    row: number,
    col: number,
    cb: (index: number, left_value: string, right_value: string) => boolean
  ) {
    let left_str = "X",
      right_str = "X";
    this.loop((i) => {
      left_str +=
        -1 < row - i && this.matrix[row].length > col + i
          ? this.matrix[row - i][col + i]
          : " ";
      right_str +=
        -1 < col - i && this.matrix.length > row + i
          ? this.matrix[row + i][col - i]
          : " ";
      return cb(i, left_str, right_str);
    });
  }

  traverse(cb: (row: number, column: number, value: string) => void) {
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[i].length; j++) {
        cb(i, j, this.matrix[i][j]);
      }
    }
  }
}
