import react from "@vitejs/plugin-react";
import Pages from "vite-plugin-pages";

import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    Pages({
      dirs: "src/pages",
      extensions: ["tsx", "jsx"],
    }),
  ],
});
