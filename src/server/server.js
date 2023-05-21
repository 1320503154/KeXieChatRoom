import axios from "axios";
axios.defaults.timeout = 3000; //3秒的等待时间,3秒到了不再等待response
axios.defaults.withCredentials = true; //跨域相关请求,携带token
axios.defaults.baseURL = "/api"; //这几个没啥用,用的都是getUserList这个axios实例
const getUserList = axios.create({
	baseURL: "/api",
	timeout: 3000,
});
export function useJoin(username, avatarSelected) {
	return getUserList.post({
		url: "login",
		data: {
			name: username,
			avatarSelected: avatarSelected,
		},
	});
}
export function UseGetOnlineUserList() {
	return getUserList.get("https://kexie.space/chat/data/onlinelist");
}
export function useSendMsg(msg, ID) {
	return getUserList.post({
		type: "msg",
		sender: ID,
		msg: msg,
	});
}
