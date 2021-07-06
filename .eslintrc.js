module.exports = {
   parser: "babel-eslint",
   env: {
      es6: true,
      node: true,
      browser: true,
   },
   parserOptions: {
      ecmaVersion: 6,
      sourceType: "module",
      ecmaFeatures: {
         jsx: true,
      },
   },
   plugins: ["prettier", "react-hooks"],
   extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:prettier/recommended",
      "react-app",
   ],
   rules: {
      "react/prop-types": 0,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
   },
};
