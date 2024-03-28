import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // 打包时排除cdn 需要在index.html引入cdn js文件
  // build: {
  //   rollupOptions: {
  //     external: ['vue', 'vuex', 'axio', 'vue-router'],
  //     plugins: [
  //       externalGlobals({
  //         vue: 'Vue',
  //         vuex: 'Vuex',
  //         axios: 'axios',
  //         'vue-router': 'VueRouter'
  //       })
  //     ]
  //   }
  // },
  plugins: [
    vue(),
    // 查看打包文件
    // visualizer({
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true,
    // }),
  ],
})
