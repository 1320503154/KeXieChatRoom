<script setup>
	import {
		ref,
		reactive,
		toRefs,
		onBeforeMount,
		onMounted,
		watch,
		computed,
		onUpdated,
	} from "vue";
	import chatMessage from "../components/chatMessage.vue";
	import { useRoute, useRouter } from "vue-router";
	import { ElMessage } from "element-plus";
	import { useChatStore } from "../stores/Chat";
	//引入相关文件

	//定义相关信息
	const chatmsg = ref("");
	const messagesEnd = ref(null); //首先，在模板中添加 ref 属性获取最后一条消息的 DOM 元素，是实现滚动到底部功能的前提
	const socket = new WebSocket("ws://localhost:8080");
	const containerRef = ref(null);
	//欢迎成员进入
	const Welcome = () => {
		let NowUserName = localStorage.getItem("username");
		store.username = NowUserName;
		ElMessage({
			message: store.WelcomeUser,
			type: "success",
			duration: 1500,
		});
	};
	//函数读取Blob对象转化为字符串
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
	// 判断是否滑倒底部
	function isScrolledToBottom() {
		const container = containerRef.value;
		return (
			container.scrollTop == container.scrollHeight - container.clientHeight
		);
	}
	//引入pinia仓库
	const store = useChatStore();
	function CreateSocket() {
		// 监听 WebSocket 的打开事件
		socket.addEventListener("open", (event) => {
			console.log("WebSocket connection opened.");
		});
		socket.addEventListener("message", (event) => {
			readBlobAsString(event.data).then((str) => {
				console.log(str);
				let JsStr = JSON.parse(str);
				console.log("str.message::: ", JsStr.message);
				store.messages.push(JsStr.message);
			});
		});
	}
	//当组件挂载时
	onMounted(() => {
		Welcome();
	});
	//监听消息更新
	onUpdated(() => {
		//使用 onUpdated 钩子函数，监听 store 中的 messages 数组是否更新。
		//每当 messages 更新时，onUpdated 钩子函数会执行，messagesEnd 变量的值会更新，指向最新的最后一条消息的 DOM 元素。
		if (isScrolledToBottom()) {
			// 将消息滑倒底部
			if ("scrollBehavior" in document.documentElement.style) {
				messagesEnd.value.scrollIntoView({ behavior: "smooth" });
			} else {
				messagesEnd.value.scrollIntoView();
			}
		}
	});
	//添加消息
	function AddMsg() {
		if (chatmsg.value.trim() == "") {
			ElMessage({
				type: "error",
				message: "请不要输入空消息!!!",
				duration: 1500,
			});
			return;
		}
		let chatMsg = chatmsg.value;
		socket.send(
			JSON.stringify({
				user: localStorage.getItem("username"),
				message: chatMsg,
				userId: store.avatarSelected,
			})
		);
		chatmsg.value = "";
	}
	CreateSocket();
</script>
<template>
	<div>
		<div
			class="chatRoom"
			ref="containerRef">
			<chatMessage
				v-for="(item, index) in store.messages"
				:key="index">
				<template #msg>{{ item }}</template>
				<template #username>{{ store.username }}</template>
			</chatMessage>
			<div ref="messagesEnd"></div>
			<!-- 当到达消息的底部时 -->
		</div>
		<div class="form-control">
			<input
				class="input input-alt"
				placeholder="请发送你的消息!"
				required=""
				v-model="chatmsg"
				type="text"
				@keyup.enter="AddMsg()" />
			<span class="input-border input-border-alt"></span>
		</div>

		<button
			class="sendBtn"
			@click="AddMsg()">
			<span> 发 送 </span>
		</button>
	</div>
</template>

<style scoped>
	/* 淡入淡出效果 */
	.car-view-enter-active {
		transition: all 0.3s ease-out;
		/* animation: bounce-in 0.5s; */
	}
	.car-view-leave-active {
		/* animation: bounce-in 0.5 reverse; */
		transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
	}
	.car-view-enter-from,
	.car-view-leave-to {
		transform: translateX(20px);
		opacity: 0;
	}
	/* 淡入淡出效果 */
	.chatRoom {
		position: relative;
		width: 99vw;
		height: 80vh;
		margin-bottom: 60px;
		border-radius: 1rem;
		background: url("/聊天网页背景.png") no-repeat center center;
		background-size: cover;
		backdrop-filter: blur(5px);
		background-color: rgba(255, 255, 255, 0.8);
		/* background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); */
		box-shadow: 0px 2px 10px 5px rgba(0, 0, 0, 0.25);
		z-index: 1;
		/* 为什么z-index没有生效?,因为position没有指定 */
		overflow-y: auto;
		margin-left: 0.3rem;
	}
	.sendBtn {
		padding: 0.1em 0.25em;
		width: 13em;
		height: 4.2em;
		background-color: #212121;
		border: 0.08em solid #fff;
		border-radius: 0.3em;
		font-size: 12px;
		position: fixed;
		bottom: 0.5rem;
		right: 0.9rem;
		cursor: pointer;
	}

	.sendBtn span {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		bottom: 0.4em;
		width: 8.25em;
		height: 2.5em;
		border-radius: 0.2em;
		font-size: 1.5em;
		font-weight: bold;
		color: #ffffff;
		border: 0.08em solid #fff;
		box-shadow: 0 0.4em 0.1em 0.019em #fff;
	}

	.sendBtn span:hover {
		transition: all 0.5s;
		transform: translate(0, 0.4em);
		box-shadow: 0 0 0 0 #fff;
	}

	.sendBtn span:not(hover) {
		transition: all 1s;
	}

	.input {
		height: 10vh;
		color: #000000;
		font-size: 0.9rem;
		background-color: transparent;
		width: 90%;
		box-sizing: border-box;
		padding-inline: 0.5em;
		padding-block: 0.7em;
		border: none;
		border-bottom: var(--border-height) solid var(--border-before-color);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		position: fixed;
		bottom: 0.5rem;
	}

	.input-border {
		position: absolute;
		background: var(--border-after-color);
		width: 0%;
		height: 2px;
		bottom: 0;
		left: 0;
		position: fixed;
		bottom: 0.5rem;
		transition: width 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045);
	}

	.input:focus {
		outline: none;
	}

	.input:focus + .input-border {
		width: 100%;
	}

	.form-control {
		position: relative;
	}

	.input-alt {
		font-size: 1.2rem;
		padding-inline: 1em;
		padding-block: 0.8em;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.input-border-alt {
		height: 3px;
		background: linear-gradient(90deg, #ff6464 0%, #ffbf59 50%, #47c9ff 100%);
		transition: width 0.4s cubic-bezier(0.42, 0, 0.58, 1);
	}

	.input-alt:focus + .input-border-alt {
		width: 90%;
	}
</style>
