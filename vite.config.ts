import { defineConfig, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const config: UserConfigExport = {
    plugins: [vue(), vueJsx()]
  }
  if (command === 'serve') {
    config.server = {
      open: true
    }
  }
  return config
})
