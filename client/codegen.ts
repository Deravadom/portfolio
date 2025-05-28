
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3000/graphql',
  documents: ["src/graphql/**/*.gql"],
  generates: {
    "./src/__generated__/types.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
    }
  }
};

export default config;
