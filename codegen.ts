import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/api/graphql",
  documents: [
    "pages/**/*.tsx",
    "components/**/*.tsx",
    "graphql/client/**/*.ts",
    "context/providers/**/*.tsx",
  ],
  generates: {
    "generated/": {
      preset: "client",
      plugins: [],
    },
  },
}

export default config
