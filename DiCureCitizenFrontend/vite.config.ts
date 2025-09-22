import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://169.224.230.28:8080", // tera backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
