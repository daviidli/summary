module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
	'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
	'indent': [2, 'tab', { 'SwitchCase': 1, 'VariableDeclarator': 1 }],
	'no-tabs': 0,
	'max-len': [
		'error',
		{
			code: 200,
			ignoreComments: true,
			ignoreUrls: true,
		},
	],
	'class-methods-use-this': 0,
  },
};
