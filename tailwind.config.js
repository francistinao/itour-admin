/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				main: ["Poppins", "sans-serif"],
			},
			colors: {
				primGreen: "#013300",
				primYellow: "#F9DE06",
				primWhite: "#F3F3F3",
				secGreen: "#277413",
				primGrey: "#D7D7D7",
			},
			backgroundColor: {
				primGreen: "#013300",
				primYellow: "#F9DE06",
				primWhite: "#F3F3F3",
				secGreen: "#277413",
				primGrey: "#D7D7D7",
			},
		},
	},
	plugins: [],
};
