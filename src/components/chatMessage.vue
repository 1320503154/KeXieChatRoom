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

	const TouXiangStyles = computed(() => ({
		width: "50px",
		height: "50px",
		background: `url(/头像${store.avatarSelected}.jpg) no-repeat center center`,
		backgroundSize: "cover",
		borderRadius: "50%",
	}));
</script>

<template>
	<div>
		<div class="chat-container" ref="chatMessage">
			<div :style="TouXiangStyles"></div>
			<div class="username"></div>
			<div class="chat-message">
				<div class="arrow"></div>
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<style scoped>
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
		position: relative;
		margin-left: 10px;
		/* border: 1px solid tomato; */
	}
	.chat-message {
		position: absolute;
		background-color: #7d71e8;
		border-radius: 0.5rem;
		color: #fbfef9;
		top: 0;
		left: 58px;
		font-size: 2rem;
		padding: 5px 1rem 0 1rem;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
	}
	.chat-message .arrow {
		position: absolute;
		left: -16px;
		bottom: 25px;
		width: 0;
		height: 0;
		font-size: 0;
		border: solid 8px;
		border-color: #f2f4f8 #7d71e8 #f2f4f8 #f2f4f8;
		z-index: 0;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
	}
</style>
