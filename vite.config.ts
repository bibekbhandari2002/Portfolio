
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Disable source maps in production to prevent information disclosure
    // Source maps can expose sensitive implementation details to attackers
    // For production builds, we do not generate source maps
    // For development builds, source maps are still generated (via --mode development)
    sourcemap: false,
    
    // Enable minification for smaller bundle size and better security
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Remove console statements in production
        drop_debugger: true, // Remove debugger statements
      },
      mangle: true, // Mangle variable names for obfuscation
    },
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    // Report compressed size
    reportCompressedSize: true,
  },
}));