/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#059669', // Emerald Green
                secondary: '#F97316', // Bright Orange
                surface: '#FFFFFF', // White
                background: '#F3F4F6', // Soft Gray
                accent: '#EF4444', // Red
            }
        },
    },
    plugins: [],
}
