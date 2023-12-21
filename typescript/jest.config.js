module.exports = {
	roots: ['<rootDir>/src'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	moduleNameMapper: {
		'@utils/(.*)': '<rootDir>/src/utils/$1'
	}
};
