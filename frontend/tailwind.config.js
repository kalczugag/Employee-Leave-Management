/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            spacing: {
                18: "72px",
                80: "80px",
                273: "273px",
                "screen-fit": "min-h-[calc(100vh - 80px)]",
            },
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
