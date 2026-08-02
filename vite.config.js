import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/My-Portfolio/",
  plugins: [react(), tailwindcss()],
  build: {
  chunkSizeWarningLimit: 1000,
  rollupOptions: {
    output: {
      manualChunks: {
        three: ["three"],
        reactThree: [
          "@react-three/fiber",
          "@react-three/drei",
          "@react-three/rapier"
        ],
        gsap: ["gsap"]
      }
    }
  }
}
})
