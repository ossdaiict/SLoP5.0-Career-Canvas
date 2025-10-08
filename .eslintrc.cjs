/* eslint-env node */
module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
	],
	settings: {
		react: { version: "detect" },
	},
	parserOptions: {
		ecmaFeatures: { jsx: true },
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react"],
	rules: {
		"no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
		"react/prop-types": "off",
		"react/react-in-jsx-scope": "off",
	},
};
