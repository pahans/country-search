import type { CodegenConfig } from '@graphql-codegen/cli';
import { API_URL } from './src/constants';

const config: CodegenConfig = {
  overwrite: true,
  schema: API_URL,
  documents: 'src/**/*.ts',
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
