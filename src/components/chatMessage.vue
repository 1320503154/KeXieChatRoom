<script setup>
	import {
		ref,
		reactive,
		onBeforeMount,
		onMounted,
		watch,
		computed,
		defineEmits
	} from "vue";
	import { useChatStore } from "../stores/Chat";
	const store = useChatStore();
	const date = ref(new Date());
	const NowTime = computed(() => {
		const hours = date.value.getHours();
		const minutes = date.value.getMinutes();
		const seconds = date.value.getSeconds();
		const timeStr = `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
			seconds < 10 ? "0" : ""
		}${seconds}`;
		//三目运算符判断,保证分钟和秒钟的格式是"xx:xx:xx"
		return timeStr;
	});
	const TouXiangStyles = computed(() => ({
		//float: "left",
		width: "50px",
		height: "50px",
		background: `url(/头像${store.avatarSelected}.jpg) no-repeat center center`,
		backgroundSize: "cover",
		borderRadius: "50%",
	}));

	// 获取消息高度
	const chatMessage = ref(null)
	let height = 0;
	let marginTop = 0;
	let marginBottom = 0;
	let paddingTop  = 0;
	let paddingBottom = 0;
	const emit = defineEmits(["messageHeight"])
	const emitMessageHeight = (height) => {
		emit("messageHeight", height)
	}
	onMounted(()=> {
		// 计算一条消息的总高度
		if (chatMessage.value) {
			const style = getComputedStyle(chatMessage.value);
		height = chatMessage.value.clientHeight
		marginTop = parseInt(style.marginTop)
		marginBottom = parseInt(style.marginBottom)
		paddingTop = parseInt(style.paddingTop)
		paddingBottom = parseInt(style.paddingBottom)
		emitMessageHeight(totalHeight())
		}
	})
	const totalHeight = () => {
		return height + marginTop +marginBottom + paddingTop + paddingBottom;
	}
</script>

<template>
	<div>
		<div class="chat-container" ref="chatMessage">
			<div class="IDContainer">
				<div :style="TouXiangStyles"></div>
				<div class="TimeLine">-{{ NowTime }}-</div>
				<div class="username"><slot name="username"></slot></div>
			</div>

			<div class="chat-message">
				<slot name="msg"></slot>
			</div>
		</div>
	</div>
</template>

<style scoped>
	:root {
		--text-color: #fbfef9;
	}
	.IDContainer {
		/* display: flex; */
		justify-content: center;
		align-items: center;
		margin-right: 20px;
	}
	.TimeLine {
		color: #000000;
	}
	.username {
		color: #000000;
	}
	.TouXiang {
		width: 50px;
		height: 50px;
		background: url(/头像1.jpg) no-repeat center center;
		background-size: cover;
		/* 6 */
		border-radius: 50%;
	}
	.chat-container {
		margin-top: 1rem;
		margin-left: 1rem;
		position: relative;
		display: flex;

		/* border: 1px solid tomato; */
	}
	.chat-message {
		align-self: baseline;
		/* position: absolute; */
		background-color: #7d71e8;
		border-radius: 0.5rem;
		color: #fbfef9;
		top: 0;
		left: 4rem;
		font-size: 1.5rem;
		padding: 5px 1rem 0 1rem;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
	}

	.chat-message .arrow {
		position: absolute;
		left: 5.1rem;
		width: 0;
		height: 0;
		font-size: 0;
		border: solid 8px;
		border-color: #000000 #7d71e8 #000000 #000000;
		z-index: -1;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
	}
	.chat-message::before {
		content: "";
		position: absolute;
		z-index: 1;
		top: 0.5rem;
		left: 4.8rem;
		margin-left: -5px;
		border-width: 10px;
		border-style: solid;
		border-color: transparent #7569d9 transparent transparent;
	}
</style>
