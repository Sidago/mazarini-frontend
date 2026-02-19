import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  ignorePatterns([
    // Custom ignores:
    "node_modules/**",
    "dist/**",
    "public/**",
    "@next/next/no-img-element -- Allow using <img> tags for better performance and control over images.",
  ]),
]);

export default eslintConfig;
