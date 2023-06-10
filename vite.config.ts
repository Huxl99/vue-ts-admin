import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
//引入svg需要用到插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
//mock插件提供方法
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
export default defineConfig(({ command, mode }) => {
  //获取各种环境下的对应的变量
  let env = loadEnv(mode, process.cwd())

  return {
    // publicPath: 'https://gitee.com/jch1011/guiguzhenxuan',
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        localEnabled: command === 'serve',
      }),
      visualizer({
        open: true, //注意这里要设置为true，否则无效
        gzipSize: true,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    //scss全局变量一个配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    //代理跨域
    server: {
      // 设置代理
      host: '0.0.0.0', //
      port: 3307, //自定义端口
      https: false, //false关闭https，true为开启
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址设置
          target: env.VITE_SERVE,
          //需要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
