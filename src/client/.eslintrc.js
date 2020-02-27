module.exports = {
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    extends: [
      "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
      "plugin:@typescript-eslint/recommended" // Uses the recommended rules from @typescript-eslint/eslint-plugin
    ],
    parserOptions: {
      ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
      sourceType: "module", // Allows for the use of imports
      ecmaFeatures: {
        jsx: true // Allows for the parsing of JSX
      }
    },
    ignorePatterns: [
      ".vscode/",
      ".vscode-test/",
      "logs/",
      "node_modules/",
      "src/assets/",
      "src/translations/"
    ],
    "plugins": [
      "react-hooks"
    ],
    rules: {
      // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
      // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  
      //temporarily disabled until we decide which rules to enable
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-var-requires": "off",
      "react/display-name" : "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "react-hooks/exhaustive-deps": "off",
      "eqeqeq": "warn",
  
      //React Hooks
      "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
      //"react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
    },
    settings: {
      react: {
        version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
      }
    }
  };