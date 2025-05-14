import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// @ts-ignore
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "./src/assets"),
      components: path.resolve(__dirname, "./src/components"),
      lib: path.resolve(__dirname, "./src/lib"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      layouts: path.resolve(__dirname, "./src/layouts"),
      views: path.resolve(__dirname, "./src/views"),
      providers: path.resolve(__dirname, "./src/providers"),
      db: path.resolve(__dirname, "./src/db"),
      lang: path.resolve(__dirname, "./src/lang"),
    },
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
