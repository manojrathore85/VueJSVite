import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//     VueDevTools(),
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
// })
export default defineConfig({
  plugins: [vue(), VueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/PHP_JWT": {
        target: "http://localhost/PHP_JWT/", // Change this to match your PHP server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/PHP_JWT/, ""), // Remove '/PHP_JWT' prefix
      },
    },
  },
});
