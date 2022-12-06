/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  resolver: 'ts-jest-resolver',
  testEnvironment: 'node',
  setupFiles: ['./tests/setup-tests.ts'],
  moduleDirectories: ['node_modules', 'src'],
  modulePaths: ['./src'],
  roots: ['./src'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
