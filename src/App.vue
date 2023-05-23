<script setup>
	import { RouterLink, RouterView } from "vue-router";
	import navigator from "./components/navigator.vue";
	import { useChatStore } from "./stores/Chat";
	import axios from "axios";
</script>

<template>
	<navigator />
	<div class="Main-container">
		<RouterView />
	</div>
	<button @click="signIn()">1</button>
</template>

<style>
	/* 一般在App.vue这个文件内部是不用scoped的,全局生效 */
	.Main-container {
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: linear-gradient(to bottom right, transparent, mistyrose),
			url("/聊天网页背景.png");
		background-color: #212121;
		background-repeat: no-repeat;
		background-size: cover;
		background-attachment: fixed;
	}
	.navBar {
		display: flex;
		justify-content: space-around;
		height: 3vh;
		align-items: center;
	}
	.Home {
		text-decoration: none;
	}
	.About {
		text-decoration: none;
	}
	.active {
		color: rgb(58, 180, 140);
	}
</style>
