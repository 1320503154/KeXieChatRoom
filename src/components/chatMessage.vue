<script setup>
	import { ref, reactive, onMounted, computed } from "vue";
	import { useChatStore } from "../stores/Chat";

	const props = defineProps({
		avatarSelected: Number,
	});
	//由此props是得到由父组件传递过来的avatarSelected的值的对象
	//props的值可以直接在模板中使用
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
		width: "3rem",
		height: "3rem",
		background: `url(/头像${
			props.avatarSelected + 1
		}.jpg) no-repeat center center`,
		backgroundSize: "cover",
		borderRadius: "50%",
	}));

	// 获取消息高度
	const chatMessage = ref(null);
	let height = 0;
	let marginTop = 0;
	let marginBottom = 0;
	let paddingTop = 0;
	let paddingBottom = 0;
	const emit = defineEmits(["messageHeight"]);
	const emitMessageHeight = (height) => {
		emit("messageHeight", height);
	};

	onMounted(() => {
		// 计算一条消息的总高度
		if (chatMessage.value) {
			const style = getComputedStyle(chatMessage.value);
			height = chatMessage.value.clientHeight;
			marginTop = parseInt(style.marginTop);
			marginBottom = parseInt(style.marginBottom);
			paddingTop = parseInt(style.paddingTop);
			paddingBottom = parseInt(style.paddingBottom);
			emitMessageHeight(totalHeight());
		}
	});

	const totalHeight = () => {
		return height + marginTop + marginBottom + paddingTop + paddingBottom;
	};
</script>
<template>
	<div
		class="msg"
		ref="chatMessage">
		<div class="main">
			<div class="metainfo">
				<div :style="TouXiangStyles"></div>
				<div class="username">
					<slot name="username"></slot>
				</div>
			</div>
			<div class="decoration"></div>
			<div class="content">
				<div class="chat-message">
					<slot name="msg"></slot>
				</div>
			</div>
		</div>
		<div class="time-stamp">
			<div class="TimeLine">-{{ NowTime }}-</div>
		</div>
	</div>
</template>

<style scoped>
	:root {
		--text-color: #fbfef9;
	}

	.msg {
		margin-top: 0.8rem;
		margin-left: 0.8rem;
		max-width: 90%;
	}

	.main {
		display: flex;
		justify-content: center;
		max-width: fit-content;
		align-items: center;
		flex-direction: column;
		padding: 0.5rem;

		/* border: 1px solid #212121; */
		border-radius: 0.5rem;
		box-shadow: 3px 3px 7px 0px rgba(0, 0, 0, 0.329);
		gap: 0.3rem;
		backdrop-filter: blur(18px);
	}

	.metainfo {
		display: flex;
		justify-content: start;
		align-items: center;
		gap: 1rem;
		align-self: flex-start;
	}

	.username {
		font-size: 1rem;
	}

	.content {
		align-self: flex-start;
		text-align: left;
		text-indent: 2rem;
		font-size: 1rem;
	}

	.time-stamp {
		margin-top: 0.2rem;
		opacity: 0.7;
		text-shadow: 5px 5px 0px 5px rgba(0, 0, 0, 0.356);
	}

	.decoration {
		width: 89%;
		height: 1px;
		max-width: 400px;
		border-radius: 2px;
		background-color: #212121;
		box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.096);

		align-self: flex-start;
		animation: 0.6s ease appearance;
	}

	.TimeLine {
		font-size: 0.7rem;
	}

	@keyframes appearance {
		from {
			width: 0;
		}

		to {
			width: 80%;
		}
	}
</style>
