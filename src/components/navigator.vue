<template>
	<div class="container">
		<div class="text">在线人数：{{ count }}</div>
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
	const count = ref(0);
	const router = useRouter();
	function handleClickOut() {
		localStorage.removeItem("username");
		localStorage.removeItem("avatarSelected");
		router.push("/login");
	}
</script>

<style scoped>
	@media (max-width: 300px) {
	}

	.container {
		height: 5vh;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 16px;
		width: 100%;
		background: linear-gradient(125deg, #f5f7fa, white);
		background: linear-gradient(
			125deg,
			rgba(249, 203, 209, 0.3),
			rgba(206, 181, 223, 0.3),
			rgba(163, 204, 246, 0.3),
			rgba(167, 245, 198, 0.3),
			rgba(233, 239, 183, 0.3),
			rgba(249, 171, 152, 0.3),
			rgba(246, 152, 152, 0.3)
		);
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
		height: 40px;
		font-size: 20px;
		color: rgb(62, 65, 65);
		letter-spacing: 2px;
		line-height: 40px;
		border-radius: 35px;
		border: none;
		background-image: linear-gradient(to left, #e1dcfd, #dbfbf0);
		text-align: center;
		cursor: pointer;
	}
	.out-btn:active {
		transform: scale(0.9);
		box-shadow: inset 0px 0.1em 0.6em #5ff8fb;
	}
</style>
