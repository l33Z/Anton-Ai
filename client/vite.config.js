import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/ask": {
        target: "https://anton-ai.onrender.com/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
