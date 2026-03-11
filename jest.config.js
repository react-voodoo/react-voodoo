module.exports = {
	testEnvironment: 'jest-environment-jsdom',

	setupFilesAfterEnv: ['<rootDir>/etc/tests/jest.setup.js'],

	transform: {
		'^.+\\.[jt]sx?$': 'babel-jest',
	},

testMatch: ['<rootDir>/etc/tests/**/*.test.{js,jsx}'],

	// tween-axis ships a CJS dist — no transformation needed.
	// d3-ease and color-rgba expose CJS-compatible builds.
	// The local dist/ bundle is already compiled CJS — skip babel on it too.
	transformIgnorePatterns: ['/node_modules/', '/dist/'],
};
