import { defineStore } from "pinia";
import axios from "axios";

export const useChatStore = defineStore("chat", {
	state: () => ({
		username: "Default",
		avatarSelected: Math.floor(Math.random() * 10) + 1, //头像选择,暂时没用
		messageList: [], //存放消息对象的数组
	}),
	getters: {
		//computed
		WelcomeUser: (state) => {
			return "欢迎你的到来!" + state.username;
		},
		RandomNum: () => {
			Math.floor(Math.random() * 10) + 1;
		},
	},
	actions: {
		//methods
		addMessage(message) {
			this.messageList.push(message);
		},
	},
	persist: {
		// 修改为 sessionStorage，默认为 localStorage
		storage: sessionStorage,
		paths: ["messageList"],
	},
});
