import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest-env.ts'],
  collectCoverageFrom: [
    '<rootDir>/src/infrastructure/**/*.ts',
    '!<rootDir>/src/infrastructure/**/bodySchema.ts',
    '<rootDir>/src/infrastructure/repositories/*.ts',
    '!<rootDir>/src/app/repositories/*.ts',
    '<rootDir>/src/app/entities/*.ts',
    '<rootDir>/src/app/useCases/**/*.ts',
    '<rootDir>/src/main/**/*.ts',
    '!<rootDir>/src/main/config/**/*.ts',
    '!<rootDir>/src/main/factories/**/*.ts',
    '!<rootDir>/src/main/routes/**/*.ts',
    '!<rootDir>/src/main/server.ts',
  ],
  moduleNameMapper: {},
  transform: {
    '^.+\\.(ts|tsx)?$': '@swc/jest',
  },
  clearMocks: true,
  coverageThreshold: {
    global: {
      lines: 100,
    },
  },
};
export default config;
