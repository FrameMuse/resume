import path from "path"
import { defineConfig } from "vite"


function resolveBase() {
  if (process.env.VITE_BASE_URL) {
    return process.env.VITE_BASE_URL.endsWith("/") ? process.env.VITE_BASE_URL : `${process.env.VITE_BASE_URL}/`
  }

  const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1]
  if (process.env.GITHUB_ACTIONS === "true" && repositoryName) {
    return `/${repositoryName}/`
  }

  return "/"
}


// https://vitejs.dev/config/
export default defineConfig({
  base: resolveBase(),
  plugins: [],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "blogs": path.resolve(__dirname, "./blogs"),
    },
  },
  server: {
    host: "0.0.0.0"
  },
  build: {
    outDir: "build",

    sourcemap: true,
    emptyOutDir: true,

    minify: true
  },
  esbuild: {
    keepNames: false,
    supported: {
      // https://stackoverflow.com/questions/72618944/get-error-to-build-my-project-in-vite-top-level-await-is-not-available-in-the
      "top-level-await": true
    },
  },
})
