import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextCoreWebVitals,
  ...nextTypescript,
  globalIgnores([".next/**", "node_modules/**", "out/**", "dist/**", "next-env.d.ts"]),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
]);

export default eslintConfig;
