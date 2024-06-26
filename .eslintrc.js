module.exports = {
   parser: "@babel/eslint-parser",
   env: {
      es6: true,
      node: true,
      browser: true,
   },
   parserOptions: {
      requireConfigFile: false,
      babelOptions: {
         presets: ["@babel/preset-react"]
      },
      ecmaVersion: 6,
      sourceType: "module",
      ecmaFeatures: {
         jsx: true,
      },
   },
   plugins: ["react-hooks"],
   extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      // "plugin:prettier/recommended",
      "react-app",
   ],
   rules: {
      "react/prop-types": 0,
      "react-hooks/rules-of-hooks": "warn",
      "react-hooks/exhaustive-deps": "warn",
      // "prettier/prettier": 0,
      "no-empty": 0,
   },
};
