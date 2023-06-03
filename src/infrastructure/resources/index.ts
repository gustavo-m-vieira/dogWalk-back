/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { readdirSync } from 'fs';

import type { AWS } from '@serverless/typescript';

// ! What we don't use is disabled
const resources: AWS['resources'] = {
  // Conditions: {},
  // Description: '',
  // Mappings: {},
  // Metadata: {},
  Outputs: {},
  // Parameters: {},
  Resources: {},
  // Transform: [],
  // extensions: {},
};

const ignoreDir = ['index.ts'];
const ignoreFile: string[] = ['index.ts'];

// * Read each folder inside resources
// ! This will break if there is a file
readdirSync(__dirname)
  .filter((el) => !ignoreDir.includes(el))
  .forEach((curDir) => {
    // * Read each file inside folder
    const files = readdirSync(`${__dirname}/${curDir}`);

    files
      .filter((file) => !ignoreFile.includes(file))
      .forEach((file) => {
        const resource = require(`${__dirname}/${curDir}/${file}`).default;

        Object.assign(resources.Resources!, resource.Resources);
        Object.assign(resources.Outputs!, resource.Outputs);
      });
  });

export default resources;
