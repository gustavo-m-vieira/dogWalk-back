import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest-env.ts'],
  collectCoverageFrom: ['<rootDir>/src/infrastructure/controllers/**/*.ts'],
  moduleNameMapper: {},
  transform: {
    '^.+\\.(ts|tsx)?$': '@swc/jest',
  },
  clearMocks: true,
  // coverageThreshold: {
  //   global: {
  //     lines: 100,
  //   },
  // },
};
export default config;
