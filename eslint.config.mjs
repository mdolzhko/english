import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// What is banned everywhere; the message is where the next person learns why.
const BANNED = [
  {
    selector: "TSAsExpression:not([typeAnnotation.typeName.name='const'])",
    message:
      "No `as`: a cast asserts a shape nobody checked. If the value comes from outside the type system (a content file, the DOM, JSON), read it through a guard in lib/content.ts; if it is already typed, fix the type instead.",
  },
  {
    selector: "TSAnyKeyword",
    message:
      "No `any`: use `unknown` and narrow it with a guard, so the compiler keeps checking.",
  },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // The project's own rules. Each says what to do instead, because the
  // refusal is where the next person learns the rule.
  {
    rules: {
      // Next's own `any` rule is off so a violation gives one message, ours.
      "@typescript-eslint/no-explicit-any": "off",
      "no-restricted-syntax": [
        "error",
        ...BANNED,
        {
          selector: "ImportExpression",
          message:
            "No `import()` outside lib/content.ts: a content file's exports are `unknown` until a guard there has read them.",
        },
      ],
    },
  },
  {
    files: ["lib/content.ts"],
    rules: { "no-restricted-syntax": ["error", ...BANNED] },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
