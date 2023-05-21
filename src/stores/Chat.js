import { defineStore } from "pinia";
import axios from "axios";

export const useChatStore = defineStore(
	"chat",
	{
		state: () => ({
			username: "Default",
			avatarSelected: Math.floor(Math.random() * 10) + 1,
			messages: [],
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
			async getApi() {
				try {
					const res = await axios.get("https://api.wrdan.com/hitokoto");
					if (res.status == 200) {
						console.log(res);
						this.addMessage(res.data.text);
					}
				} catch (err) {
					console.error(err);
				}
			},
			addMessage(message) {
				this.messages.push(message);
			},
		},
	},
	{
		persist: true,
	}
);
