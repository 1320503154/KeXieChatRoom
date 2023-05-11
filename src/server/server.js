import axios from "axios";
axios.defaults.timeout = 3000; //3秒的等待时间,3秒到了不再等待response
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "ws://keixe.space/chat/";
