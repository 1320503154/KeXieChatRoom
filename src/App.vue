<script setup>
	import { RouterLink, RouterView } from "vue-router";
	import navigator from "./components/navigator.vue";
	import { useChatStore } from "./stores/Chat";
	import axios from 'axios'
	const socket = new WebSocket("ws://10.33.28.51/chat");
	const store = useChatStore();
	function readBlobAsString(blob) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader(); // 创建 FileReader 对象
			reader.addEventListener("loadend", () => {
				if (reader.error) {
					reject(reader.error); // 读取出错，抛出异常
				} else {
					resolve(reader.result); // 读取成功，返回字符串结果
				}
			});
			// 读取 Blob 对象中的内容，并转换为字符串
			reader.readAsText(blob);
		});
	}
	function CreateSocket() {
		// 监听 WebSocket 的打开事件
		socket.addEventListener("open", (event) => {
			console.log("WebSocket connection opened.");
		});
		socket.addEventListener("message", (event) => {
			readBlobAsString(event.data)
				.then((str) => {
					store.messages.push(str);
				})
				.catch((error) => {
					console.error(error);
				});
		});
	}
	CreateSocket();
	// const fetchData = async () => {
	//   try {
	//     const response = await axios.get('/api/login'); // 发起网络请求
	//     const data = response.data; // 响应数据
	//     console.log(data); // 处理响应数据
	//   } catch (error) {
	//     console.error(error); // 处理错误
	//   }
	// };
	// axios.defaults.baseURL = "/api";
	function signIn(){
        axios.post('/api/login', {
            "name": "hhh",    
        	"avatarSelected": "2"   
        }).then(
            res => {
                console.log('请求成功', res.data);
                console.log(JSON.stringify(res.data));
            },
            err => {
                console.log('请求失败', err.message);
            }
        )
    }
</script>

<template>
	<navigator />
	<!-- <div class="navBar">
		<RouterLink
			to="/login"
			class="About"
			active-class="active"
			>注册</RouterLink
		>
		<RouterLink
			to="/"
			class="About"
			active-class="active"
			>主聊天室</RouterLink
		>暂时废弃
	</div> -->
	<div class="Main-container">
		<RouterView />
	</div>
	<button @click="signIn()">1</button>
</template>

<style scoped>
	.Main-container {
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: linear-gradient(to bottom right, transparent, mistyrose),
			url("/聊天网页背景.png");
		background-color: #212121;
		background-repeat: no-repeat;
		background-size: cover;
		background-attachment: fixed;
	}
	.navBar {
		display: flex;
		justify-content: space-around;
		height: 3vh;
		align-items: center;
	}
	.Home {
		text-decoration: none;
	}
	.About {
		text-decoration: none;
	}
	.active {
		color: rgb(58, 180, 140);
	}
</style>
