import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest-env.ts'],
  collectCoverageFrom: [
    '<rootDir>/src/controllers/**/*.ts',
    '<rootDir>/src/entities/**/*.ts',
    '<rootDir>/src/providers/**/*.ts',
    '<rootDir>/src/repositories/**/*.ts',
    '<rootDir>/src/useCases/**/*.ts',
    '!<rootDir>/src/controllers/**/index.ts',
    '!<rootDir>/src/controllers/**/bodySchema.ts',
    '!<rootDir>/src/repositories/**/schema.ts',
  ],
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)?$': '@swc/jest',
    // '^.+\\.(js|jsx)$': 'babel-jest',
  },
  clearMocks: true,
  // coverageThreshold: {
  //   global: {
  //     lines: 100,
  //   },
  // },
};
export default config;
