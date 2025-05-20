import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // optimizing this package was causing it to crash
  optimizeDeps: {
    exclude: ["@electric-sql/pglite", "@electric-sql/pglite-react"],
  },
  // wasn't building before - adding this enables top-level await in builds
  build: {
    target: "esnext",
  },
  // build error again - fix by explicitly mention vite to not use iife or umd
  worker: {
    format: "es",
  },
});
