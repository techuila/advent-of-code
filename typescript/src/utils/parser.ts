import * as fs from 'fs';

export const parser = (filePath: string) => {
	const data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
	const inputs = data
		.trim()
		.split('\n')
		.map((e) => e.trim());

	return inputs;
};
