/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#3646c8",
                "alt-primary": "#4e5cd4",
                secondary: "#29e373",
                accent: "#949bf7",
                background: "#ecedfe",
            },
        },
    },
    plugins: [],
};
