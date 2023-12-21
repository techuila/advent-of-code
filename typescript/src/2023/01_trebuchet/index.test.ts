import path from 'path';
import { trebuchet } from '.';
import { parser } from '@utils/parser';

describe('Tests for Advent of code 2023, day 1: Trebuchet?!', () => {
	test('Test from example 1, it should return 142', () => {
		const file_path = path.resolve(__dirname, 'data', 'example1.txt');
		const inputs = parser(file_path);

		const sum = trebuchet(inputs);

		expect(sum).toEqual(142);
	});

	test('Test from example2, it should return 281', () => {
		const file_path = path.resolve(__dirname, 'data', 'example2.txt');
		const inputs = parser(file_path);

		const sum = trebuchet(inputs);

		expect(sum).toEqual(281);
	});
});
