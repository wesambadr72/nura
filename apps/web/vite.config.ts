import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { varlockVitePlugin } from "@varlock/vite-integration";
import { defineConfig } from "vite";

// Vite `base` must match the path where the site is hosted:
// - Hosting at the domain root (Netlify, custom domain, local dev)  -> "/"
// - GitHub Pages project site (user.github.io/<repo>/)              -> "/nura/" via BASE_PATH
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base,
  resolve: {
    tsconfigPaths: true,
  },
  optimizeDeps: {
    entries: ["src/**/*.{ts,tsx}"],
  },
  plugins: [varlockVitePlugin({ ssrInjectMode: "auto-load" }), tailwindcss(), reactRouter()],
});
