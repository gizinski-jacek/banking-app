/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {},
		colors: {
			'bg-color': {
				light: 'rgb(235, 220, 150)',
				DEFAULT: 'rgb(235, 220, 150)',
				dark: 'rgb(75, 0, 125)',
			},
			'text-color': {
				light: 'rgb(75, 0, 125)',
				DEFAULT: 'rgb(75, 0, 125)',
				dark: 'rgb(235, 220, 150)',
			},
			'btn-bg-color': {
				light: 'rgb(75, 0, 125)',
				DEFAULT: 'rgb(75, 0, 125)',
				dark: 'rgb(235, 220, 150)',
			},
			'btn-text-color': {
				light: 'rgb(255, 50, 100)',
				DEFAULT: 'rgb(255, 50, 100)',
				dark: 'rgb(180, 50, 75)',
			},
			'shadow-color': {
				light: 'rgb(180, 50, 75)',
				DEFAULT: 'rgb(180, 50, 75)',
				dark: 'rgb(0, 215, 200)',
			},
		},
	},
	plugins: [],
};
