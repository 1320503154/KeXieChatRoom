import { fileURLToPath, URL } from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
		// @=src,@/router===src/router
	},

	server: {
		//   host: "0.0.0.0", //打开显示本地地址
		open: true, // 是否自动启动浏览器
		//   port: 8080,//端口号
		proxy: {
			// 本地开发环境通过代理实现跨域
			// 正则表达式写法
			"/api": {
				target: "http://chat.kexie.space:8080", // 后端服务实际地址
				changeOrigin: true, //开启代理
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
