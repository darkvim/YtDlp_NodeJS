export default {
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	testEnvironment: 'node',
	transformIgnorePatterns: ['/node_modules/'],
}
