<template>
	<div class="container">
		<div class="text">在线人数：{{ PersonCount.data }}</div>
		<div class="bt">
			<button
				class="out-btn"
				@click="handleClickOut">
				登出
			</button>
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	import { useRouter } from "vue-router";
	import axios from "axios";
	import { inject } from "vue";
	//传递socket实例
	const { data: socket } = inject("EmitSocket");
	//父组件传值.获取socket实例
	const PersonCount = inject("onlineCountData");
	const router = useRouter();
	//创建axios实例,用于登出
	const SignOut = axios.create({
		baseURL: "/api",
		timeout: 3000,
		withCredentials: true,
	});
	//点击登出按钮触发的函数
	const stopSocket = () => {
		socket.close();
	};
	function handleClickOut() {
		let request = {
			type: "SignOut",
			sender: localStorage.getItem("ID"),
		};
		SignOut.post("/login", request)
			.then((res) => {
				console.log("登出成功");
				console.log(res.data);
			})
			.catch((err) => {
				console.log("登出失败" + err);
			});
		localStorage.removeItem("username");
		localStorage.removeItem("avatarSelected");
		localStorage.removeItem("ID");
		router.push("/login"); //跳转到登录界面
		stopSocket();
	}
</script>

<style scoped>
	@media screen and (max-width: 300px) {
		.out-btn {
			height: 30px;
		}
	}

	.container {
		position: sticky;
		top: 0;
		z-index: 1000;
		height: 7vh;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 16px;
		width: 100%;
		background: linear-gradient(
			125deg,
			#fdf1f5,
			#f4edf0,
			#fbf2e8,
			#fdeaea,
			#e5e5f7
		);
		border-bottom: 2px solid #d8d2d6;
		/* background: linear-gradient(
    125deg,
    #f0dcdf85,
    #f9e8d4e0,
    #dddde1cc,
    rgba(249, 210, 215, 0.3),
    rgba(223, 199, 239, 0.3),
    rgba(181, 215, 248, 0.3),
    rgba(187, 245, 210, 0.3),
    rgba(243, 247, 201, 0.3),
    rgba(248, 202, 190, 0.3),
    rgba(250, 178, 178, 0.3)
  ); */
		animation: bgAnimation 15s linear infinite;
		background-size: 400%;
	}

	@keyframes bgAnimation {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	.out-btn {
		width: 100px;
		height: 37px;
		font-size: 20px;
		color: rgb(62, 65, 65);
		letter-spacing: 2px;
		line-height: 37px;
		border-radius: 35px;
		border: none;
		background-image: linear-gradient(to left, #e7e4f9, #dbfbf0);
		text-align: center;
		cursor: pointer;
	}
	.out-btn:active {
		transform: scale(0.9);
		box-shadow: inset 0px 0.1em 0.6em #5ff8fb;
	}
</style>
