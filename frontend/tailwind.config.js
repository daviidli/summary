// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

module.exports = {
	purge: ['./src/**/*.vue', './src/**/*.html'],
	darkMode: 'class',
	theme: {
		extend: {
			lineHeight: {
				'leading-15': '3.5rem',
			},
		},
		fontFamily: {
			sans: ['Quicksand', 'sans-serif'],
			serif: ['"Playfair Display"', 'serif'],
		},
		colors: {
			...colors,
		},
	},
	variants: {
		extend: {
			opacity: ['disabled'],
			backgroundColor: ['checked'],
		},
	},
	plugins: [],
};
