import path from 'path';
import { parser } from './parser';

export function Inputs(dirname: string) {
	return function (file_name: string) {
		const file_path = path.resolve(dirname, 'data', file_name);
		return parser(file_path);
	};
}
