import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import envCompatible from "vite-plugin-env-compatible";
import tailwind from "tailwindcss";
import path from "path";

export default () => {
    const proxy_url = "http://localhost:8080/";

    const config = {
        envPrefix: "REACT_APP_",
        build: {
            outDir: "build",
        },
        define: {
            global: {},
        },
        resolve: {
            base: "/",
            alias: {
                "@": path.resolve(__dirname, "src"),
            },
        },
        plugins: [
            react(),
            envCompatible(),
            tsconfigPaths(),
            svgrPlugin({
                svgrOptions: {
                    icon: true,
                },
            }),
        ],
        css: {
            postcss: {
                plugins: [tailwind()],
            },
        },
        server: {
            port: 3000,
            proxy: {
                "/api": {
                    target: proxy_url,
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
        test: {
            environment: "jsdom",
            globals: true,
            setupFiles: "./tests/setup.ts",
        },
    };
    return defineConfig(config);
};
