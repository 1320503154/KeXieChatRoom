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

	//引入pinia仓库
	const store = useChatStore();
	const router = useRouter();

	//当组件挂载时
	onMounted(() => {
		isLogin();
		Welcome();
		containerRef.value.scrollTop = containerRef.value.scrollHeight;
	});

	//欢迎成员进入
	const Welcome = () => {
		ElMessage({
			message: store.WelcomeUser,
			type: "success",
			duration: 1500,
		});
		let TouXiangID = localStorage.getItem("avatarSelected");
		store.avatarSelected = TouXiangID;
	};

	//判断是否登录
	function isLogin() {
		let NowUserName = localStorage.getItem("username");
		if (NowUserName) {
			store.username = NowUserName;
			router.push("/chatRoom");
		} else {
			router.push("/Login");
		}
	}
	//监听消息更新
	onUpdated(() => {
		//使用 onUpdated 钩子函数，监听 store 中的 messages 数组是否更新。
		//每当 messages 更新时，onUpdated 钩子函数会执行，messagesEnd 变量的值会更新，指向最新的最后一条消息的 DOM 元素。
		if (isScrolledToBottom() || isFirstScrollMessage()) {
			containerRef.value.scrollTop = containerRef.value.scrollHeight;
		}
	});

	//新建WebSocket链接
	let username = localStorage.getItem("username");
	// const socket = new WebSocket(`ws://10.33.28.51/chat/name=${username}`);
	// // 监听 WebSocket 的打开事件
	// socket.addEventListener("open", (event) => {
	// 	console.log("WebSocket链接建立成功!");
	// });
	// //监听后端发送的消息事件
	// socket.addEventListener("message", (event) => {
	// 	console.log("event::: ", event);
	// });
	const chatmsg = ref(""); //输入框双向绑定的消息~
	const messagesEnd = ref(null); //首先，在模板中添加 ref 属性获取最后一条消息的 DOM 元素，是实现滚动到底部功能的前提

	const containerRef = ref(null); //判断是否在底部的dom

	const messageHeight = ref(0);
	// 得到子组件的消息高度
	const getMessageHeight = (height) => {
		messageHeight.value = height;
	};

	// 判断是否滑倒底部
	function isScrolledToBottom() {
		const container = containerRef.value;
		return (
			parseInt(container.scrollTop) ==
			container.scrollHeight - container.clientHeight - messageHeight.value
		);
	}

	function isFirstScrollMessage() {
		const container = containerRef.value;
		if (container.scrollHeight <= container.clientHeight + messageHeight.value)
			return true;
	}

	//添加消息
	function AddMsg(event) {
		event.preventDefault();
		if (chatmsg.value.trim() == "") {
			ElMessage({
				type: "error",
				message: "请不要输入空消息!!!",
				duration: 1500,
			});
			return;
		}

		let chatMsg = chatmsg.value;
		let chatMsgList = JSON.stringify({
			type: "msg",
			msg: chatMsg,
			sender: localStorage.getItem("ID"),
		});

		// socket.send(chatMsgList);
		chatmsg.value = "";
	}
</script>
<template>
	<div class="room">
		<div
			class="msg-stage"
			ref="containerRef">
			<chatMessage
				v-for="(item, index) in store.messageList"
				:key="index"
				@messageHeight="getMessageHeight">
				<template #msg>{{ item.message }}</template>
				<template #username>{{ item.username }}</template>
			</chatMessage>
			<div ref="messagesEnd"></div>
			<!-- 当到达消息的底部时 -->
		</div>
		<div class="intent-area">
			<input
				autofocus
				class="input input-alt"
				placeholder="请发送你的消息!"
				required=""
				v-model="chatmsg"
				type="text"
				@keyup.enter="AddMsg($event)" />

			<button
				class="sendBtn"
				@click="AddMsg()">
				➠
			</button>
		</div>
	</div>
</template>

<style scoped>
	.room {
		width: 110vw;
		height: 92.6vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.msg-stage {
		position: relative;
		width: 99vw;
		max-width: 1200px;
		height: 81vh;
		margin-bottom: 4.5rem;
		background: transparent;
		z-index: 0;
		overflow-y: auto;
		margin-left: 0.3rem;
	}

	.intent-area {
		position: fixed;
		top: calc(98vh - 4rem);
		display: flex;
		justify-content: space-between;
		width: 98%;
		max-width: 1200px;
		align-self: center;
	}

	.sendBtn {
		width: 4rem;
		height: 4rem;
		display: block;
		margin-left: 0.6rem;
		line-height: 4rem;
		border-radius: 4rem;
		background-color: #212121;
		font-size: 3rem;
		color: #d8f4f8;
		cursor: pointer;
		scale: 1;
	}

	.sendBtn:hover {
		transition: all 0.25s ease-in-out;
		transform: scale(1.05);
	}

	.input {
		height: 4rem;
		width: 100%;
		font-family: "noto sans";
		color: #000000;
		font-size: 1.7rem;
		font-weight: 480;
		box-sizing: border-box;
		padding-inline: 0.5em;
		padding-block: 0.7em;
		border: none;
		border-radius: 0.4rem;
		box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.18);
		background: transparent;
		backdrop-filter: blur(18px);
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
		/* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
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
