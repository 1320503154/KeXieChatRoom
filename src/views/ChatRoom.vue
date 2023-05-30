<script setup>
	import {
		ref,
		reactive,
		onMounted,
		watch,
		computed,
		onUpdated,
		onUnmounted,
		inject,
	} from "vue";
	import chatMessage from "../components/chatMessage.vue";

	import { useRoute, useRouter } from "vue-router";
	import { ElMessage } from "element-plus";
	import { useChatStore } from "../stores/Chat";

	let onlineCountNow = ref(0)
	const { data: onlineCountData, setOnlineCountData } = inject("onlineCountData")
	const router = useRouter();
	const route = useRoute()
	const { data: show, setShow } = inject("isShow")
	setShow(route.meta.isShow)

	const chatmsg = ref("");
	const messagesEnd = ref(null);

	const containerRef = ref(null);
	const scrollToBottom = () => {
		const container = containerRef.value;
		if (container) {
			container.scrollTo({
				top: container.scrollHeight,
				behavior: "smooth",
			});
		}
	};
	// 判断是否滑倒底部
	function isScrolledToBottom() {
		const container = containerRef.value;
		// console.log(
		// 	parseInt(container.scrollTop),
		// 	container.scrollHeight - container.clientHeight - messageHeight.value
		// );
		if (
			parseInt(container.scrollTop) ==
				container.scrollHeight - container.clientHeight - messageHeight.value ||
			parseInt(container.scrollTop) - 1 ==
				container.scrollHeight - container.clientHeight - messageHeight.value ||
			parseInt(container.scrollTop) + 1 ==
				container.scrollHeight - container.clientHeight - messageHeight.value
		)
			return true;
		else return false;
		// return (
		// 	parseInt(container.scrollTop) ==
		// 	container.scrollHeight - container.clientHeight - messageHeight.value
		// );
	}
	function isFirstScrollMessage() {
		const container = containerRef.value;
		if (container.scrollHeight <= container.clientHeight + messageHeight.value)
			return true;
	}
	//引入pinia仓库
	const store = useChatStore();

	onMounted(() => {
		isLogin();
		Welcome();
		containerRef.value.scrollTop = containerRef.value.scrollHeight;
	});

	const Welcome = () => {
		ElMessage({
			type: "success",
			message: store.WelcomeUser,
			duration: 1500,
		});
	};
	function isLogin() {
		let NowUserName = localStorage.getItem("username");
		if (NowUserName) {
			store.username = NowUserName;
			router.push("/chatRoom");
		} else {
			router.push("/Login");
		}
	}

	onUpdated(() => {
		if (isScrolledToBottom() || isFirstScrollMessage()) {
			containerRef.value.scrollTop = containerRef.value.scrollHeight;
		}
	});

	let username = localStorage.getItem("username");

	const socket = new WebSocket(`ws://chat.kexie.space:8080/chat/${username}`);

	socket.onopen = () => {
		console.log("监听到打开事件---WebSocket链接建立成功!");
	};

	socket.onmessage = handleMsgEvent;

	function handleMsgEvent(event) {
		console.log("监听到消息事件---WebSocket消息接收成功!");

		let EventData = JSON.parse(event.data);
		// 将在线人数传给App组件再传给navigator
		if(EventData.data.type === "onlineCountChanged") {
			onlineCountNow = EventData.data.onlineCountNow
			setOnlineCountData(onlineCountNow)
		} 

		if (EventData.data.type == "incomingMsg") {
			let msgList = {
				message: EventData.data.content,
				avatarSelected: EventData.data.senderAvatarId,
				username: EventData.data.name,
			};

			store.addMessage(msgList);
		}
	}

	socket.onclose = handleCloseEvent;

	function handleCloseEvent() {
		console.log("监听到关闭事件---WebSocket链接关闭!");
	}
	onUnmounted(() => {
		socket.close();
	});

	const messageHeight = ref(0);
	// 得到子组件的消息高度
	const getMessageHeight = (height) => {
		messageHeight.value = height;
	};

	// 以下是本地测试的代码

	function AddMsg() {
		if (chatmsg.value.trim() == "") {
			ElMessage({
				type: "error",
				message: "请不要输入空消息!!!",
				duration: 1500,
			});
			return;
		}

		let chatMsg = chatmsg.value.trim();

		let chatMsgList = JSON.stringify({
			type: "msg",
			msg: chatMsg,
			sender: localStorage.getItem("ID"),
			avatarSelected: localStorage.getItem("avatarSelected"),
		});
		socket.send(chatMsgList);
		// let messageObject = {
		// 	username: username,
		// 	message: chatMsg,
		// 	avatarSelected: Math.floor(Math.random() * 10) + 1,
		// };
		// store.addMessage(messageObject);
		chatmsg.value = "";
	}
</script>
<template>
	<div class="room">
		<div
			class="msg-stage"
			ref="containerRef">
			<chatMessage
				:avatarSelected="item.avatarSelected"
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
				inputmode="text"
				class="input input-alt"
				placeholder="请发送你的消息!"
				required=""
				v-model="chatmsg"
				type="text"
				@keyup.enter="AddMsg()" />

			<button
				class="send-btn"
				@click.prevent="AddMsg()">
				<div>➠</div>
			</button>
		</div>
		<div>
			<button
				class="scroll-to-bottom"
				@click="scrollToBottom">
				&#8595;
			</button>
		</div>
	</div>
</template>

<style scoped>
	.room {
		width: 110vw;
		height: 92.6vh;
		/* height: -webkit-fill-available; */
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

	.send-btn {
		width: 4rem !important;
		height: 4rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-left: 0.6rem;
		padding: 0.4rem 0.4rem;
		line-height: 4rem;
		border-radius: 4rem;
		background-color: #212121;
		font-size: 3rem;
		color: #d8f4f8;
		cursor: pointer;
		scale: 1;
		text-align: center;
	}
	.intent-area {
		position: fixed;
		bottom: 0.5rem;
		display: flex;
		justify-content: space-between;
		width: 98%;
		max-width: 1200px;
		align-self: center;
	}

	.send-btn {
		width: 3rem !important;
		height: 3rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-left: 0.6rem;
		padding: 0.4rem 0.4rem;
		line-height: 3rem;
		border-radius: 4rem;
		background-color: #212121;
		font-size: 2rem;
		color: #d8f4f8;
		cursor: pointer;
		scale: 1;
		text-align: center;
	}
	.send-btn:hover {
		transition: all 0.25s ease-in-out;
		transform: scale(1.05);
	}

	.input {
		height: 3rem;
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
		font-size: 1rem;
		padding-inline: 0.5em;
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
	.scroll-to-bottom {
		color: black;
		font-size: 1.3rem;
		cursor: pointer;
		position: fixed;
		top: 10px;
		z-index: 10;
		width: 32px;
		height: 32px;
		border: none;
		border-radius: 50%;
		background: transparent;
		box-shadow: 3px 3px 4px 2px rgba(0, 0, 0, 0.3);
	}
	.scroll-to-bottom:active {
		box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.3) inset;
	}
	/* .scroll-to-bottom::after {
		content: "点我到底部";
		display: none;
		position: absolute;
		top: 48px;
		left: -20px;
		width: 80px;
		height: 16px;
		background: transparent;
		text-align: center;
		border-radius: 2rem;
		font-size: 0.8rem;
		color: rgb(0, 183, 255);
		padding-bottom: 1rem;
	}
	.scroll-to-bottom:hover::after {
		display: block;
	} */
	@media screen and (max-width: 512px) {
		.scroll-to-bottom {
			height: 32px;
			top: 0.5vh;
		}
	}
</style>
