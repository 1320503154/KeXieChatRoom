<template>
	<form>
		<div style="position: relative">
			<div class="view">
				<img
					class="preview"
					ref="preview"
					@click="change"
					:src="avatar" />
			</div>
			<p>点击可以ROLL不同头像哦~</p>
		</div>
		<input
			class="name"
			type="text"
			name="userID"
			v-model="username"
			placeholder="在这里设置你的聊天室ID😎"
			@keydown.enter="handleEnterBtnClick" />
		<button
			class="btn"
			type="submit"
			@click="handleEnterBtnClick">
			✨加入聊天室✨
		</button>
	</form>
</template>

<script setup>
	//WebSocket
	// const join = new WebSocket('ws://keixe.space/chat/')
	// console.log('ws连接状态：' + join.readyState);
	// const request = {
	//     "name": "test",
	//     "avatarSelected": "1"
	// }
	// join.send(request)
	import { ElMessage } from "element-plus";
	import { ref, onMounted } from "vue";
	import { useRouter } from "vue-router";
	import { useChatStore } from "../stores/Chat";
	import avatar1 from "/头像4.jpg";
	import avatar2 from "/头像5.jpg";
	import avatar3 from "/头像6.jpg";
	const store = useChatStore();
	const username = ref("");
	const Err = ref("");
	const router = useRouter();

	const regex = /^[\u4e00-\u9fa5a-zA-Z0-9]{2,8}$/; //正则表达式,检测是否是合法的用户名

	function matchReg(regex, str) {
		return regex.test(str);
	}
	onMounted(() => {
		username.value = localStorage.getItem("username");
		if (username.value) {
			router.push("/");
			return;
		}
	});
	function handleEnterBtnClick(event) {
		event.preventDefault();
		const _username = username.value.trim(); //trim()方法用于处理空格
		if (!matchReg(regex, _username)) {
			Err.value = "请输入正确的用户名,应该是2-8个英文,中文,或者数字的组合";
			ElMessage({
				type: "error",
				message: Err.value,
				duration: 1500,
			});
			return;
		}
		localStorage.setItem("username", _username);
		store.username = _username;
		username.value = "";
		router.push("/");
	}
	const data = [
		{
			avatar: avatar1,
			number: "1",
		},
		{
			avatar: avatar2,
			number: "2",
		},
		{
			avatar: avatar3,
			number: "3",
		},
	];

	const randomint = (max) => {
		return Math.floor(Math.random() * max);
	};
	let avatar = data[randomint(3)].avatar;
	const change = () => {
		avatar = data[randomint(3)].avatar;
	};
</script>

<style scoped>
	form {
		/* test props */
		width: 400px;
		height: 400px;
		background-color: rgb(243, 243, 243);
		border: 1px solid #dddddd;
		/* real props */
		border-radius: 40px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		user-select: none;
		cursor: pointer;
	}

	.view {
		width: 220px;
		height: 220px;
		border-radius: 50%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border: 2px solid #dddddd;
		overflow: hidden;
	}

	p {
		position: absolute;
		top: -100px;
		right: -100px;
		transform: rotate(330deg);
		font-size: 22px;
		white-space: nowrap;
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		writing-mode: tb-rl;
		background-image: linear-gradient(to top, #12c2e9, #c471ed, #f64f59);
	}

	.preview {
		width: 100%;
		height: 100%;
		background-position: center center;
	}

	.file {
		background-color: #fff;
		display: none;
	}

	.name {
		width: 70%;
		height: 12%;
		background-color: #f9f9f9;
		border: 1px solid #dddddd;
		border-radius: 10px;
		text-align: center;
		outline: 0;
	}
</style>
