<script setup>
	import { ElMessage } from "element-plus";
	import { ref, onMounted, inject } from "vue";
	import { useRouter, useRoute } from "vue-router";
	import { useChatStore } from "../stores/Chat.js";
	import axios from "axios";
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
	import { getCurrentInstance } from "vue";

	const instance = getCurrentInstance();
	console.log("avatar9::: ", avatar9);

	const route = useRoute();

	const { data: show, setShow } = inject("isShow");
	setShow(route.meta.isShow);
	onMounted(() => {
		username.value = localStorage.getItem("username");
		if (username.value) {
			router.push("/chatRoom");
			return;
		}
	});
	const Join = axios.create({
		baseURL: "/api",
		timeout: 3000,
		withCredentials: true,
	});

	const store = useChatStore();
	const avatarSelected = ref("");

	const username = ref("");
	const Err = ref("");
	const router = useRouter();
	const regex = /^[\u4e00-\u9fa5a-zA-Z0-9]{2,8}$/; //正则表达式,检测是否是合法的用户名

	//以下是读取Blob类型数据为字符串,暂时废弃
	function readBlobAsString(blob) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader(); // 创建 FileReader 对象
			reader.addEventListener("loadend", () => {
				if (reader.error) {
					reject(reader.error); // 读取出错，抛出异常
				} else {
					resolve(reader.result); // 读取成功，返回字符串结果
				}
			});
			// 读取 Blob 对象中的内容，并转换为字符串
			reader.readAsText(blob);
		});
	}

	function matchReg(regex, str) {
		return regex.test(str);
	}

	function handleEnterBtnClick(event) {
		event.preventDefault();
		const _username = username.value.trim(); //trim()方法用于处理空格
		const _index = data[index].number;
		if (!matchReg(regex, _username)) {
			Err.value =
				"请输入正确的用户名,应该是2-8个英文,中文,或者数字的组合,不要有符号!!!";
			ElMessage({
				type: "error",
				message: Err,
				duration: 5000,
			});
			return;
		}

		localStorage.setItem("username", _username);
		localStorage.setItem("avatarSelected", _index);

		store.avatarSelected = _index;
		avatarSelected.value = "";

		store.username = _username;
		username.value = "";

		let request = {
			name: localStorage.getItem("username"),
			avatarSelected: localStorage.getItem("avatarSelected"),
		};
		Join.post("/login", request)
			.then((res) => {
				console.log(res);
				if (res.data.statuts == "sucessed") {
					localStorage.setItem("username", res.data.name);
					localStorage.setItem("avatarSelected", res.data.avatarSelected);
					localStorage.setItem("ID", res.data.id);
					setTimeout(() => {
						router.push("/chatRoom");
					}, 500);
				} else if (res.data.statuts == "failedAtDuplicationOfName") {
					ElMessage({
						type: "error",
						message: "你取得用户名和别人重名了",
						duration: 2000,
					});
				}
			})
			.catch((err) => {
				console.log(err);
				if (err.message == "Request failed with status code 500") {
					ElMessage({
						type: "error",
						message: "服务器响应失败!!!",
						duration: 3000,
					});
				} else if (err.message == "timeout of 3000ms exceeded") {
					ElMessage({
						type: "error",
						message: "服务器响应时间过长,失败!!!",
						duration: 3000,
					});
				}
			});
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
	let index = randomint(10);
	const avatar = ref(data[index].avatar);
	const change = () => {
		index = randomint(10);
		avatar.value = data[index].avatar;
	};
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
		height: 99vh;
		border-radius: 1rem;
		background: url("/聊天网页背景.png") no-repeat center center;
		background-size: cover;
		backdrop-filter: blur(5px);
		background-color: rgba(255, 255, 255, 0.8);
		box-shadow: 0px 2px 10px 5px rgba(0, 0, 0, 0.25);
		margin-top: 0.3rem;
		margin-left: 0.3rem;
		overflow: hidden;
	}

	form {
		/* test props */
		width: 25vw;
		height: 400px;
		min-width: 300px;
		background-color: rgb(243, 243, 243);
		border: 1px solid #dddddd;
		/* real props */
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
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		-webkit-tap-highlight-color: transparent;
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
		top: -7vh;
		right: -3vw;
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
		overflow: hidden;
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
		font-size: 80%;
	}

	.name:focus {
		outline: 2px solid #51a1b6;
	}

	.btn {
		background-color: #fff;
		border: 1px solid #dddddd;
		width: 60%;
		height: 10%;
		font-size: 80%;
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
