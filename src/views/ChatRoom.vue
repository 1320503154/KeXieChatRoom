<script setup>
	import { ref, reactive, onMounted, watch, computed, onUpdated } from "vue";
	import chatMessage from "../components/chatMessage.vue";

	import { useRoute, useRouter } from "vue-router";
	import { ElMessage } from "element-plus";
	import { useChatStore } from "../stores/Chat";

	const store = useChatStore();
	const router = useRouter();

	onMounted(() => {
		isLogin();
		Welcome();
		containerRef.value.scrollTop = containerRef.value.scrollHeight;
	});

	const Welcome = () => {
		ElMessage({
			type: "error",
			message: "请不要输入空消息!!!",
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

	// const socket = new WebSocket(`ws://10.33.28.51/chat/name=${username}`);

	// socket.addEventListener("open", (event) => {
	// 	console.log("WebSocket链接建立成功!");
	// });

	// socket.addEventListener("message", (event) => {
	// 	let data = JSON.parse(event.data);
	//        if(data.type == "incomingMsg"){
	// 		let msgList={
	// 			message:data.content,
	// 			avatarSelected:data.senderAvatarId,
	// 			username:data.sender,
	// 		};
	//         store.addMessage(msgList);
	// }
	const chatmsg = ref("");
	const messagesEnd = ref(null);

	const containerRef = ref(null);

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
		console.log("发送的消息是::" + chatMsg + "::以下是后端的消息");
		let chatMsgList = JSON.stringify({
			type: "msg",
			msg: chatMsg,
			sender: localStorage.getItem("ID"),
			avatarSelected: localStorage.getItem("avatarSelected"),
		});
		// socket.send(chatMsgList);
		let messageObject = {
			username: username,
			message: chatMsg,
			avatarSelected: Math.floor(Math.random() * 10) + 1,
		};
		store.addMessage(messageObject);
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
				autofocus
				class="input input-alt"
				placeholder="请发送你的消息!"
				required=""
				v-model="chatmsg"
				type="text"
				@keyup.enter="AddMsg()" />

			<button
				class="send-btn"
				@click="AddMsg()">
				<div>➠</div>
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

	.send-btn:hover {
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
