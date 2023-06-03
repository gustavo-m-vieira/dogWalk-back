const resource = {
  Resources: {
    JWTKeySecret: {
      Type: 'AWS::SecretsManager::Secret',
      Properties: {
        Name: '${self:custom.jwt.secretName}',
        Description: 'JWT Key',
        GenerateSecretString: {
          PasswordLength: 32,
          IncludeSpace: false,
          ExcludePunctuation: true,
          ExcludeCharacters: 'AÁÀÂÄÃaáàâäãEÉÈÊËeéèêëIÍÌÎÏiíìîïOÓÒÔÖÕoóòôöõUÚÙÛÜuúùûüCÇcç',
        },
      },
    },
  },
};

export default resource;
