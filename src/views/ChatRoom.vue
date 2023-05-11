<script setup>
	import {
		ref,
		reactive,
		toRefs,
		onBeforeMount,
		onMounted,
		watch,
		computed,
	} from "vue";
	import chatMessage from "../components/chatMessage.vue";
	import { useRoute, useRouter } from "vue-router";
	import { ElMessage } from "element-plus";
	import { useChatStore } from "../stores/Chat";
	const chatmsg = ref("");
	const Welcome = () => {
		ElMessage({
			message: store.WelcomeUser,
			type: "success",
			duration: 1500,
		});
	};
	const store = useChatStore();
	onMounted(() => {
		Welcome();
	});
	function Add() {
		store.addMessage(chatmsg);
		chatmsg.value = "";
	}
</script>
<template>
	<div>
		<div class="chatRoom">
			<chatMessage></chatMessage>
			<div class="form-control">
				<input
					class="input input-alt"
					placeholder="请发送你的消息!"
					required=""
					v-model="chatmsg"
					type="text" />
				<span class="input-border input-border-alt"></span>
			</div>

			<button class="sendBtn">
				<span> 发 送 </span>
			</button>
		</div>
	</div>
</template>

<style scoped>
	.chatRoom {
		width: 100vw;
		height: 87vh;
		border-radius: 1rem;
		background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
		z-index: -100;
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
		background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
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
		--width-of-input: 300px;
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
