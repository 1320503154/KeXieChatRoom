<script setup>
	import { ElMessage } from "element-plus";
	// @=src,@/router===src/router
	import { ref, onMounted } from "vue";
	import { useRouter } from "vue-router";
	import { useChatStore } from "../stores/Chat.js";
	import avatar0 from "/头像1.jpg";
	import avatar1 from "/头像2.jpg";
	import avatar2 from "/头像3.jpg";
	import avatar3 from "/头像4.jpg";
	import avatar4 from "/头像5.jpg";
	import avatar5 from "/头像6.jpg";
	import avatar6 from "/头像7.jpg";
	import avatar7 from "/头像8.jpg";
	import avatar8 from "/头像9.jpg";
	import avatar9 from "/头像10.jpg";
	import axios from "axios";
	const store = useChatStore();
	const username = ref("");
	const avatarSelected = ref("");
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
		const _index = data[index].number;
		if (!matchReg(regex, _username)) {
			Err.value = "请输入正确的用户名,应该是2-8个英文,中文,或者数字的组合";
			return;
		}
		localStorage.setItem("username", _username);
		localStorage.setItem("avatarSelected", _index);
		store.avatarSelected = _index;
		avatarSelected.value = "";
		store.username = _username;
		username.value = "";
		router.push("/chatRoom");
		console.log(_username);
		axios.post('/api/login', {
            "name": _username,    
        	"avatarSelected": _index 
        }).then(
            res => {
                console.log('请求成功', res.data);
                console.log(JSON.stringify(res.data));
            },
            err => {
                console.log('请求失败', err.message);
            }
        )
	}

	const data = [
		{
			avatar: avatar0,
			number: "0",
		},
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
		{
			avatar: avatar4,
			number: "4",
		},
		{
			avatar: avatar5,
			number: "5",
		},
		{
			avatar: avatar6,
			number: "6",
		},
		{
			avatar: avatar7,
			number: "7",
		},
		{
			avatar: avatar8,
			number: "8",
		},
		{
			avatar: avatar9,
			number: "9",
		},
	];

	const randomint = (max) => {
		return Math.floor(Math.random() * max);
	};
	let index = randomint(9);
	const avatar = ref(data[index].avatar);
	const change = () => {
		index = randomint(9);
		avatar.value = data[index].avatar;
		return index;
	};

	// const join = new WebSocket("ws://10.33.28.51/chat");
	// console.log('ws连接状态：' + join.readyState);
	const request = {
		name: username,
		avatarSelected: avatarSelected,
	};
	//后端写好之后可以打开这两个注释，一个是用于测试连接状态，一个是发送信息。
	// join.send(request)
</script>

<template>
	<div class="allin">
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
	</div>
</template>

<style scoped>
	.allin {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 99vw;
		height: 90vh;
		border-radius: 1rem;
		background: url("/聊天网页背景.png") no-repeat center center;
		background-size: cover;
		backdrop-filter: blur(5px);
		background-color: rgba(255, 255, 255, 0.8);
		box-shadow: 0px 2px 10px 5px rgba(0, 0, 0, 0.25);
	}

	form {
		/* test props */
		width: 400px;
		height: 400px;
		background-color: rgb(243, 243, 243);
		border: 1px solid #dddddd;
		/* real props */
		margin: 12%;
		border-radius: 40px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		user-select: none;
		background: rgba(255, 255, 255, 0.2);
		-webkit-backdrop-filter: blur(8px);
		backdrop-filter: blur(8px);
		box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.2);
	}

	.view {
		width: 220px;
		height: 220px;
		border-radius: 50%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border: 2px solid #aaaaaa;
		box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.7);
		overflow: hidden;
		cursor: pointer;
	}

	.view img {
		cursor: pointer;
		-webkit-user-drag: none;
	}

	p {
		position: absolute;
		top: -70px;
		right: -11px;
		transform: rotate(340deg);
		font-size: 22px;
		white-space: nowrap;
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		writing-mode: tb-rl;
		background-image: linear-gradient(
			to top,
			rgb(248, 108, 126),
			rgb(166, 87, 219),
			rgb(70, 153, 236),
			rgb(70, 240, 138),
			rgb(212, 229, 58),
			rgb(236, 89, 52),
			rgb(240, 68, 68),
			rgb(240, 68, 68),
			rgb(236, 89, 52),
			rgb(212, 229, 58),
			rgb(70, 240, 138),
			rgb(70, 153, 236),
			rgb(166, 87, 219),
			rgb(248, 108, 126),
			rgb(248, 108, 126),
			rgb(166, 87, 219),
			rgb(70, 153, 236),
			rgb(70, 240, 138),
			rgb(212, 229, 58),
			rgb(236, 89, 52),
			rgb(240, 68, 68),
			rgb(240, 68, 68),
			rgb(236, 89, 52),
			rgb(212, 229, 58),
			rgb(70, 240, 138),
			rgb(70, 153, 236),
			rgb(166, 87, 219),
			rgb(248, 108, 126)
		);
		background-size: 400% 400%;
		animation: ani 6s linear infinite;
	}

	@keyframes ani {
		0% {
			background-position: 0% 0%;
			transform: rotate(340deg);
		}
		50% {
			transform: rotate(330deg);
		}
		100% {
			background-position: 69% 69%;
			transform: rotate(340deg);
		}
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
		text-align: center;
		outline: 0;
		background: rgba(255, 255, 255, 0.3);
		-webkit-backdrop-filter: blur(8px);
		backdrop-filter: blur(8px);
		border-radius: 10px;
		box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.2);
		transition: border 0.2s linear;
		font-size: 16px;
	}

	.name:focus {
		outline: 2px solid #6bf789;
	}

	.btn {
		background-color: #fff;
		border: 1px solid #dddddd;
		width: 250px;
		height: 40px;
		cursor: pointer;
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.3);
		-webkit-backdrop-filter: blur(8px);
		backdrop-filter: blur(8px);
		box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.2);
		transition: border 0.2s linear;
	}

	.btn:hover {
		border: 2px solid #aaaaaa;
	}

	.btn:active {
		background: rgba(0, 0, 0, 0.001);
	}
</style>
