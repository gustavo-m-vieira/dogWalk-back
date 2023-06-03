import type { AWS } from '@serverless/typescript';

import resources from './src/infrastructure/resources';

const serverlessConfiguration: AWS = {
  service: 'dogWalk-back',
  frameworkVersion: '3',
  plugins: ['serverless-export-env'],
  provider: {
    name: 'aws',
    profile: 'ufrj',
    region: 'us-east-1',
    versionFunctions: false,
    runtime: 'nodejs18.x',
    architecture: 'arm64',
    environment: {
      NODE_ENV: 'production',
      DATABASE_NAME: '${self:custom.database.name}',
      DATABASE_USERNAME: '${self:custom.database.username}',
      DATABASE_PASSWORD:
        '${ssm:/aws/reference/secretsmanager/${self:custom.database.secretName}, ""}',
      DATABASE_ENDPOINT: '${self:custom.database.endpoint, ""}',
      JWT_KEY: '${ssm:/aws/reference/secretsmanager/${self:custom.jwt.secretName}, ""}',
    },
  },
  resources: { ...resources },
  custom: {
    database: {
      cidr: 10,
      name: 'dogWalkerDB',
      username: 'dogWalkerAdmin',
      secretName: '${self:service}-database',
      instanceClass: 'db.t4g.micro',
      allocatedStorage: 20,
      endpoint: {
        'Fn::ImportValue': '${self:service}-RDSInstanceEndpoint',
      },
    },
    'export-env': {
      filename: '.env',
      overwrite: true,
    },
    jwt: {
      secretName: '${self:service}-jwtKey',
    },
  },
};

module.exports = serverlessConfiguration;