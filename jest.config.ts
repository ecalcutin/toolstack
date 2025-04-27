import type { Config } from 'jest';
import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: Config & JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json',
      },
    ],
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transformIgnorePatterns: ['/node_modules/(?!(chalk)/)'],

  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
};

export default jestConfig;
