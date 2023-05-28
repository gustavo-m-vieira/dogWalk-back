/* eslint-disable func-names */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {},
    },
  ],
  rules: {
    'subject-case': [0, 'always'],
  },
};
