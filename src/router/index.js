import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/chatRoom",
			name: "chatRoom",
			component: () => import("../views/ChatRoom.vue"),
		},
		{
			path: "/login",
			name: "login",
			component: () => import("../views/SignIn.vue"),
		},
		{
			path: "/",
			redirect: { name: "login" },
		},
	],
});

export default router;
