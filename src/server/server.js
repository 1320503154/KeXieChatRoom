import axios from "axios";
axios.defaults.timeout = 3000; //3秒的等待时间,3秒到了不再等待response
axios.defaults.withCredentials = true; //跨域相关请求,携带token
axios.defaults.baseURL = "ws://keixe.space/chat/";
const getUserList = axios.create();
export function usePostMessage(message) {
	return axios.post({
		url: "msg",
		data: {
			type: "msg",
			sender: 5,
			msg: message,
		},
	});
}
export function getOnlineUserList() {
	return getUserList.get("https://kexie.space/chat/data/onlinelist");
}
