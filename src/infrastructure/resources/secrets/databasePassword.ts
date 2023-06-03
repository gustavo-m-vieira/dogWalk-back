const resource = {
  Resources: {
    DatabaseSecret: {
      Type: 'AWS::SecretsManager::Secret',
      Properties: {
        Name: '${self:custom.database.secretName}',
        Description: 'RDS database password',
        GenerateSecretString: {
          PasswordLength: 20,
          IncludeSpace: false,
          ExcludePunctuation: true,
        },
      },
    },
  },
};

export default resource;
