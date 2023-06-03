import type { AWS } from '@serverless/typescript';

import resources from './src/infrastructure/resources';

const serverlessConfiguration: AWS = {
  service: 'dogWalk-back',
  frameworkVersion: '3',
  plugins: ['serverless-export-env'],
  provider: {
    name: 'aws',
    profile: '${self:custom.stage}',
    region: 'us-east-1',
    versionFunctions: false,
    runtime: 'nodejs18.x',
    architecture: 'arm64',
    environment: {
      NODE_ENV: 'production',
      databaseName: '${self:custom.database.name}',
      databaseUsername: '${self:custom.database.username}',
      databasePassword: '${ssm:/aws/reference/secretsmanager/${self:custom.database.secretName}}',
      databaseEndpoint: {
        'Fn::GetAtt': ['RDSInstance', 'Endpoint.Address'],
      },
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
    },
    'export-env': {
      filename: '.env',
      overwrite: true,
    },
  },
};

module.exports = serverlessConfiguration;
