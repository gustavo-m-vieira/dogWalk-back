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
      JWT_KEY: '${ssm:/aws/reference/secretsmanager/${self:custom.jwt.secretName}, ""}',
      DATABASE_URL:
        'postgresql://${self:custom.database.username}:${self:custom.database.password}@${self:custom.database.host}:5432/${self:custom.database.name}?schema=public',
    },
  },
  resources: { ...resources },
  custom: {
    database: {
      cidr: 10,
      name: 'dogWalkerDB',
      username: 'dogWalkerAdmin',
      secretName: '${self:service}-database',
      password: '${ssm:/aws/reference/secretsmanager/${self:custom.database.secretName}, ""}',
      instanceClass: 'db.t4g.micro',
      allocatedStorage: 20,
      endpoint: {
        'Fn::ImportValue': '${self:service}-RDSInstanceEndpoint',
      },
      host: 'dogwalkerdb.cdoe9jzbfdgk.us-east-1.rds.amazonaws.com',
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
