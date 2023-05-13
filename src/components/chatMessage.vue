<script setup>
	import { min } from "lodash";
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
		float: "left",
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
			<div class="chat-message">
				<slot name="msg"></slot>
			</div>
			<div :style="TouXiangStyles"></div>
			<div class="TimeLine">{{ NowTime }}</div>
			<div class="username"><slot name="username"></slot></div>
		</div>
	</div>
</template>

<style scoped>
	:root {
		--text-color: #fbfef9;
	}
	.TimeLine {
		position: relative;
		color: #fbfef9;
		z-index: 5;
	}
	.username {
		position: relative;
		color: #fbfef9;
		z-index: 5;
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
		float: right;
		background-color: #7d71e8;
		border-radius: 0.5rem;
		color: #fbfef9;
		top: 0;
		left: 3rem;
		font-size: 1.5rem;
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
		z-index: -1;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
	}
</style>
