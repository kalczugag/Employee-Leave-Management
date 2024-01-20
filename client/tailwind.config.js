/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            spacing: {},
            colors: {
                "login-1": "#f8fbff",
                "login-2": "#eff3ff",
                "login-3": "#e1ecff",
                primary: "#0769da",
            },
        },
    },
    plugins: [],
};
