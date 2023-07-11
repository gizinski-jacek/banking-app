/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			transitionProperty: {
				width: 'width',
			},
		},
		colors: {
			'cstm-bg': 'var(--cstm-bg)',
			'cstm-color': 'var(--cstm-color)',
			'cstm-btn-bg': 'var(--cstm-btn-bg)',
			'cstm-btn-color': 'var(--cstm-btn-color)',
			'cstm-shadow': 'var(--cstm-shadow)',
		},
	},
	plugins: [],
};
