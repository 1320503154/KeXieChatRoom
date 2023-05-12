<script setup>
	import {
		ref,
		reactive,
		onBeforeMount,
		onMounted,
		watch,
		computed,
	} from "vue";
	import { useChatStore } from "../stores/Chat";
	const store = useChatStore();

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
		<div class="chat-container">
			<div :style="TouXiangStyles"></div>
			<div class="username"><slot name="username"></slot></div>
			<div class="chat-message">
				<div class="arrow"></div>
				<slot name="msg"></slot>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.username {
		color: #fbfef9;
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
