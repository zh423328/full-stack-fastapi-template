import { defineConfig } from "@hey-api/openapi-ts"

export default defineConfig({
  client: "axios",
  input: "http://localhost:8000/api/v1/openapi.json",
  output: {
    path: "src/client",
    format: "prettier",
  },
  types: {
    enums: "javascript",
  },
})
