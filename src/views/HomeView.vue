<script setup>
	import { ref, reactive } from "vue";
	const msgLists = reactive([
		{
			username: "科协官方",
			msg: "欢迎来到科协聊天室!",
			id: 1,
			time: "00.00",
		},
		{
			username: "科协官方",
			msg: "在这里你可以畅所欲言!讨论学习话题!",
			id: 2,
			time: "00.00",
		},
	]);
	const msg = ref("");
	const id = ref(3);
	const username = ref("默认id");
	function SendMsg() {
		const currentTime = new Date();
		const currentHour = currentTime.getHours(); // 获取当前小时数（0-23）
		const currentMinute = currentTime.getMinutes(); // 获取当前分钟数（0-59）
		msgLists.push({
			username: username.value,
			id: id.value,
			msg: msg.value,
			time: `${currentHour}:${currentMinute}`,
		});
		msg.value = "";
	}
</script>

<template>
	<div class="nickname-container">
		<label for="nickname">Nickname:</label>
		<input
			type="text"
			name=""
			id="nickname"
			v-model="username" />
	</div>
	<ul id="messages">
		<li
			v-for="item in msgLists"
			:key="item.id"
			class="msgStyle">
			{{ item.time }} -- {{ item.username }} : {{ item.msg }}
		</li>
	</ul>
	<form
		action=""
		id="Msg_form"
		@submit.prevent="SendMsg">
		<input
			type="text"
			name=""
			id="Msg_input"
			v-model="msg" />
		<button
			class="sendBtn"
			@keydown.enter="SendMsg">
			发送消息
		</button>
	</form>
</template>
<style scoped>
	body {
		margin: 0;
		padding-bottom: 3rem;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
			Helvetica, Arial, sans-serif;
	}

	#Msg_form {
		background: rgba(0, 0, 0, 0.15);
		padding: 0.25rem;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		height: 3rem;
		box-sizing: border-box;
		backdrop-filter: blur(10px);
	}

	#Msg_input {
		border: none;
		padding: 0 1rem;
		flex-grow: 1;
		border-radius: 2rem;
		margin: 0.25rem;
	}

	#Msg_input:focus {
		outline: none;
	}

	.sendBtn {
		background: #333;
		border: none;
		padding: 0 1rem;
		margin: 0.25rem;
		border-radius: 3px;
		outline: none;
		color: #fff;
		cursor: pointer;
	}

	#messages {
		list-style-type: none;
		margin: 0;
		padding: 0;
	}

	#messages > li {
		padding: 0.5rem 1rem;
	}

	#messages > li:nth-child(odd) {
		background: #efefef;
	}
</style>
