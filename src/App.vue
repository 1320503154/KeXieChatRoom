<script setup>
	import { RouterLink, RouterView } from "vue-router";
	import navigator from "./components/navigator.vue";
</script>

<template>
	<navigator />
	<div class="navBar">
		<RouterLink
			to="/login"
			class="About"
			active-class="active"
			>注册</RouterLink
		>
		<RouterLink
			to="/"
			class="About"
			active-class="active"
			>主聊天室</RouterLink
		>
	</div>
	<div class="Main-container">
		<RouterView />
	</div>
</template>

<style scoped>
	.Main-container {
		display: flex;
		justify-content: center;
		align-items: center;
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
