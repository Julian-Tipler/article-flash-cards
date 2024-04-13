// vite.config.ts
import { defineConfig } from "file:///Users/juliantipler/Julians_Documents/Coding/CODING%20PROJECTS/Practice/article-flash-cards/extension/node_modules/vite/dist/node/index.js";
import react from "file:///Users/juliantipler/Julians_Documents/Coding/CODING%20PROJECTS/Practice/article-flash-cards/extension/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: "index.html",
        // The entry point for the React app
        content: "content/content.js",
        // The entry point for the content script
        background: "background/background.js"
        // The entry point for the background script
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === "content") {
            return "content/content.js";
          }
          if (chunkInfo.name === "background") {
            return "background/background.js";
          }
          return "assets/[name]-[hash].js";
        },
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.includes("content") && assetInfo.name.endsWith(".css")) {
            return "content/content.css";
          }
          return "assets/[name]-[hash][extname]";
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvanVsaWFudGlwbGVyL0p1bGlhbnNfRG9jdW1lbnRzL0NvZGluZy9DT0RJTkcgUFJPSkVDVFMvUHJhY3RpY2UvYXJ0aWNsZS1mbGFzaC1jYXJkcy9leHRlbnNpb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qdWxpYW50aXBsZXIvSnVsaWFuc19Eb2N1bWVudHMvQ29kaW5nL0NPRElORyBQUk9KRUNUUy9QcmFjdGljZS9hcnRpY2xlLWZsYXNoLWNhcmRzL2V4dGVuc2lvbi92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvanVsaWFudGlwbGVyL0p1bGlhbnNfRG9jdW1lbnRzL0NvZGluZy9DT0RJTkclMjBQUk9KRUNUUy9QcmFjdGljZS9hcnRpY2xlLWZsYXNoLWNhcmRzL2V4dGVuc2lvbi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIGJ1aWxkOiB7XG4gICAgc291cmNlbWFwOiB0cnVlLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIG1haW46IFwiaW5kZXguaHRtbFwiLCAvLyBUaGUgZW50cnkgcG9pbnQgZm9yIHRoZSBSZWFjdCBhcHBcbiAgICAgICAgY29udGVudDogXCJjb250ZW50L2NvbnRlbnQuanNcIiwgLy8gVGhlIGVudHJ5IHBvaW50IGZvciB0aGUgY29udGVudCBzY3JpcHRcbiAgICAgICAgYmFja2dyb3VuZDogXCJiYWNrZ3JvdW5kL2JhY2tncm91bmQuanNcIiwgLy8gVGhlIGVudHJ5IHBvaW50IGZvciB0aGUgYmFja2dyb3VuZCBzY3JpcHRcbiAgICAgIH0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6IChjaHVua0luZm8pID0+IHtcbiAgICAgICAgICBpZiAoY2h1bmtJbmZvLm5hbWUgPT09IFwiY29udGVudFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJjb250ZW50L2NvbnRlbnQuanNcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNodW5rSW5mby5uYW1lID09PSBcImJhY2tncm91bmRcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiYmFja2dyb3VuZC9iYWNrZ3JvdW5kLmpzXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEZvciBhbGwgb3RoZXIgZW50cmllcywgcmV0YWluIHRoZSBkZWZhdWx0IGJlaGF2aW9yIHdoaWNoIGluY2x1ZGVzIGhhc2hpbmcgYW5kIGFzc2V0cyBmb2xkZXJcbiAgICAgICAgICByZXR1cm4gXCJhc3NldHMvW25hbWVdLVtoYXNoXS5qc1wiO1xuICAgICAgICB9LFxuICAgICAgICBjaHVua0ZpbGVOYW1lczogXCJhc3NldHMvW25hbWVdLVtoYXNoXS5qc1wiLFxuICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xuICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBhc3NldCBpcyBhIENTUyBmaWxlIGFuZCBpZiBpdCBpcyBiZWluZyBpbXBvcnRlZCBieSAnY29udGVudCdcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBhc3NldEluZm8ubmFtZS5pbmNsdWRlcyhcImNvbnRlbnRcIikgJiZcbiAgICAgICAgICAgIGFzc2V0SW5mby5uYW1lLmVuZHNXaXRoKFwiLmNzc1wiKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIFwiY29udGVudC9jb250ZW50LmNzc1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBEZWZhdWx0IGFzc2V0IGZpbGUgbmFtZSBwYXR0ZXJuXG4gICAgICAgICAgcmV0dXJuIFwiYXNzZXRzL1tuYW1lXS1baGFzaF1bZXh0bmFtZV1cIjtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2ZCxTQUFTLG9CQUFvQjtBQUMxZixPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLE9BQU87QUFBQSxJQUNMLFdBQVc7QUFBQSxJQUNYLGVBQWU7QUFBQSxNQUNiLE9BQU87QUFBQSxRQUNMLE1BQU07QUFBQTtBQUFBLFFBQ04sU0FBUztBQUFBO0FBQUEsUUFDVCxZQUFZO0FBQUE7QUFBQSxNQUNkO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixnQkFBZ0IsQ0FBQyxjQUFjO0FBQzdCLGNBQUksVUFBVSxTQUFTLFdBQVc7QUFDaEMsbUJBQU87QUFBQSxVQUNUO0FBQ0EsY0FBSSxVQUFVLFNBQVMsY0FBYztBQUNuQyxtQkFBTztBQUFBLFVBQ1Q7QUFFQSxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxRQUNBLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQixDQUFDLGNBQWM7QUFFN0IsY0FDRSxVQUFVLEtBQUssU0FBUyxTQUFTLEtBQ2pDLFVBQVUsS0FBSyxTQUFTLE1BQU0sR0FDOUI7QUFDQSxtQkFBTztBQUFBLFVBQ1Q7QUFFQSxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
