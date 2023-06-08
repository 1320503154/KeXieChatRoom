<script setup>
	import { RouterLink, RouterView } from "vue-router";
	import navigator from "./components/navigator.vue";
	import { useChatStore } from "./stores/Chat";
	import axios from "axios";
	import { ref, provide } from "vue";

	const onlineCountData = ref({}); //在线人数
	let EmitSocket = 0; //socket实例
	const show = ref({}); //显示导航栏
	provide("onlineCountData", {
		data: onlineCountData,
		setOnlineCountData(value) {
			onlineCountData.value = value;
		},
	});
	provide("EmitSocket", {
		data: EmitSocket, //data: socket
		setEmitSocket(value) {
			EmitSocket = value; //EmitSocket =  socket
		},
	});
	provide("isShow", {
		data: show,
		setShow(value) {
			show.value = value;
		},
	});
</script>

<template>
	<navigator v-if="show" />
	<div class="Main-container">
		<RouterView />
	</div>
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
