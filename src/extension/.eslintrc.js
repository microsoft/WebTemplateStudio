module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "plugin:@typescript-eslint/recommended" // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module" // Allows for the use of imports
  },
  ignorePatterns: [
    ".vscode/",
    ".vscode-test/",
    "logs/",
    "node_modules/",
    "out/",
    "react/",
    "corets-cli/",
    "src/corets-cli/",
    "src/scripts/"
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",

    //temporarily disabled until we decide which rules to enable
    "@typescript-eslint/no-explicit-any" : "off",
    "@typescript-eslint/interface-name-prefix": "off",
   // "@typescript-eslint/no-non-null-assertion" : "off",
    "@typescript-eslint/no-namespace" : "off",
    "@typescript-eslint/no-var-requires" : "off"
  }
};
