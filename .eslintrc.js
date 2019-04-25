module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/essential',
		'@vue/airbnb'
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		indent: [2, 'tab', {SwitchCase: 1}],
		'no-tabs': 0,
		camelcase: [0, {properties: 'never'}],
		'comma-dangle': ['error', 'never'],
		'space-before-function-paren': ['error', 'always'],
		'linebreak-style': ['error', 'windows'],
		'import/prefer-default-export': 'off',
		'max-len': 'off',
		'default-case': 0,
		'array-callback-return': 0,
		'arrow-parens': [2, 'as-needed'],
		'no-confusing-arrow': ['error', {allowParens: true}],
		'object-curly-spacing': ['error', 'never'],
		'prefer-destructuring': ['error', {
			array: false,
			object: false
		}],
		'no-param-reassign': ['error', {props: false}],
		'no-shadow': ['error', {allow: ['state']}],
		'no-plusplus': ['error', {allowForLoopAfterthoughts: true}],
		'consistent-return': 0,
		'vue/no-unused-components': 0,
		'no-underscore-dangle': 0,
		'no-restricted-syntax': 0,
		'guard-for-in': 0,
		'no-lonely-if': 0
	},
	parserOptions: {
		parser: 'babel-eslint'
	}
};
