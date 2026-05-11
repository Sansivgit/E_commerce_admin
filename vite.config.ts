import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, "");
  const proxyTarget =
    env.VITE_BACKEND_ORIGIN?.trim().replace(/\/$/, "") ||
    "http://localhost:5000";
  const port = Number(env.VITE_ADMIN_PORT || 5174) || 5174;

  return {
    plugins: [react(), tailwindcss(), tsconfigPaths()],
    server: {
      port,
      strictPort: true,
      proxy: {
        "/api": {
          target: proxyTarget,
          changeOrigin: true,
        },
      },
    },
  };
});
