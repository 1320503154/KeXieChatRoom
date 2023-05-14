import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: () => import("../views/ChatRoom.vue"),
		},
		{
			path: "/login",
			name: "login",
			component: () => import("../views/SignIn.vue"),
		},
	],
});

export default router;
