import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 5173,
    host: "127.0.0.1",
  },
  plugins: [tsConfigPaths(), tailwindcss(), tanstackStart(), viteReact()],
});
