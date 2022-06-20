module.exports = {
	preset: '@vue/cli-plugin-unit-jest',
	// Automatically clear mock calls and instances between every test
	clearMocks: true,
	// The directory where Jest should output its coverage files
	coverageDirectory: 'coverage',

	// An array of regexp pattern strings used to skip coverage collection
	coveragePathIgnorePatterns: [
		'/node_modules/'
	],
	// A set of global variables that need to be available in all test environments
	globals: {

	},
	// An array of file extensions your modules use
	moduleFileExtensions: [
		'js',
		'json',
		'jsx',
		'vue'
	],
	// A map from regular expressions to module names that allow to stub out resources with a single module
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'^@components/(.*)$': '<rootDir>/src/packages/components/$1'
	},
	testMatch: ['**/tests/**/*.spec.js'],
	transformIgnorePatterns: ['<rootDir>/node_modules/']
}