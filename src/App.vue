<script setup>
	import { RouterLink, RouterView } from "vue-router";
	import navigator from "./components/navigator.vue"
</script>

<template>
	<navigator/>
	<div class="navBar">
		<RouterLink
			to="/"
			active-class="active"
			class="Home"
			>Home</RouterLink
		>
		<RouterLink
			to="/about"
			class="About"
			active-class="active"
			>主聊天室</RouterLink
		>
	</div>

	<RouterView />
</template>

<style scoped>
	.navBar {
		display: flex;
		justify-content: space-around;
		height: 8vh;
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
