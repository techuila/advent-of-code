import { AOC } from "@utils/types";

export class GiftShop implements AOC {
  solution_1(inputs: string[]) {
    const input = inputs[0]
    const ranges = input.split(",")
    const ids: number[] = ranges.reduce((ids, range) => {
      const [left, right] = range.split("-")

      if (this.isRangePotentiallyInvalid(left, right)) {
        ids = [...ids, ...this.createArrayFromRange(+left, +right)]
      }

      return ids
    }, [] as number[])

    const sum_of_invalid_ids = ids.reduce((sum, id) => this.is_id_invalid(id) ? sum += id : sum, 0)

    return sum_of_invalid_ids
  }

  solution_2(inputs: string[]) {

  }

  private is_id_invalid(id: number): boolean {
    const id_str =  id.toString()
    const index = id_str.length / 2

    if (id_str.substring(0, index) === id_str.substring(index)) {
      return true
    }

    return false
  }

  private createArrayFromRange(left: number, right: number) {
    return Array.from({ length: (Number(right) - Number(left)) + 1 }, (_, index) => Number(left) + index)
  }

  private isRangePotentiallyInvalid(left: string, right: string) {
    return left.length % 2 === 0 || right.length % 2 === 0
  }
}
