const resource = {
  Resources: {
    RDSSubnetGroup: {
      Type: 'AWS::RDS::DBSubnetGroup',
      Properties: {
        DBSubnetGroupDescription: "RDS database's group",
        SubnetIds: [
          {
            Ref: 'SubnetA',
          },
          {
            Ref: 'SubnetB',
          },
          {
            Ref: 'SubnetC',
          },
        ],
      },
    },
    RDSParametersGroup: {
      Type: 'AWS::RDS::DBParameterGroup',
      Properties: {
        Description: "RDS database's group",
        Family: 'postgres15',
        Parameters: {
          max_connections: 1000,
          'rds.log_retention_period': 1440,
          log_statement: 'all',
          log_connections: false,
          log_disconnections: false,
          log_min_duration_statement: 0,
          log_rotation_age: 60,
          log_rotation_size: 50000,
          log_min_messages: 'LOG',
          log_min_error_statement: 'WARNING',
          log_error_verbosity: 'default',
        },
      },
    },
    RDSInstance: {
      Type: 'AWS::RDS::DBInstance',
      Properties: {
        EnablePerformanceInsights: true,
        MasterUsername: '${self:custom.database.username}',
        MasterUserPassword: {
          'Fn::Join': [
            '',
            [
              '{{resolve:secretsmanager:',
              {
                Ref: 'DatabaseSecret',
              },
              '}}',
            ],
          ],
        },
        AllocatedStorage: '${self:custom.database.allocatedStorage}',
        DBName: '${self:custom.database.name}',
        DBSubnetGroupName: {
          Ref: 'RDSSubnetGroup',
        },
        DBParameterGroupName: {
          Ref: 'RDSParametersGroup',
        },
        DBInstanceIdentifier: '${self:custom.database.name}',
        DBInstanceClass: '${self:custom.database.instanceClass}',
        Engine: 'postgres',
        EngineVersion: '15.2',
        StorageType: 'gp3',
        PubliclyAccessible: true,
        EnableCloudwatchLogsExports: ['postgresql'],
        AssociatedRoles: [],
        VPCSecurityGroups: [
          {
            Ref: 'SecurityGroup',
          },
        ],
      },
    },
  },
};

export default resource;
