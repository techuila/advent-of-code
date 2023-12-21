const digit: Record<string, number> = {
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9
};

export function trebuchet(inputs: string[]): number {
	let sum = 0;

	for (const input of inputs) {
		let _str_num = '';
		let _left_str = '';
		let _right_str = '';
		let _is_start_found = false;
		let _is_end_found = false;

		for (let i = 0; i < input.length; i++) {
			const _start = input[i];
			const _end = input[input.length - 1 - i];

			// Look for start number from left
			if (!_is_start_found) {
				if (!isNaN(+_start)) {
					_str_num = _start + _str_num;
					_is_start_found = true;
				} else {
					// Check for spelled out digits
					_left_str += _start;

					const _str_digit = getStrDigit(_left_str);
					if (_str_digit) {
						_str_num = digit[_str_digit] + _str_num;
						_is_start_found = true;
					}
				}
			}

			// Look for end number from right
			if (!_is_end_found) {
				if (!isNaN(+_end)) {
					_str_num += _end;
					_is_end_found = true;
				} else {
					// Check for spelled out digits
					_right_str = _end + _right_str;

					const _str_digit = getStrDigit(_right_str);
					if (_str_digit) {
						_str_num += digit[_str_digit];
						_is_end_found = true;
					}
				}
			}

			if (_str_num.length === 2) {
				console.log(_str_num);
				sum += Number(_str_num);
				break;
			}
		}
	}

	return sum;
}

function getStrDigit(str: string) {
	return Object.keys(digit).find((_digit) => str.includes(_digit));
}
