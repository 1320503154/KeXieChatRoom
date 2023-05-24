function createWebSocket(url, options = {}) {
	const {
		heartbeatMsg = "ping",
		heartbeatInterval = 30000,
		reconnectInterval = 1000,
		maxReconnectAttempts = Infinity,
	} = options;

	let ws = null;
	let shouldReconnect = true;
	let reconnectAttempts = 0;
	let heartbeatTimer = null;

	function connect() {
		ws = new WebSocket(url);

		// 当连接建立时，开始心跳检测
		ws.addEventListener("open", () => {
			console.log(`WebSocket 连接已建立: ${url}`);
			// 发送第一个心跳消息，然后开始定时发送心跳消息
			ws.send(heartbeatMsg);
			heartbeatTimer = setInterval(() => {
				ws.send(heartbeatMsg);
			}, heartbeatInterval);
			// 重连尝试次数置为 0
			reconnectAttempts = 0;
		});

		// 监听消息
		ws.addEventListener("message", (event) => {
			if (event.data === heartbeatMsg) {
				console.log(`收到心跳消息: ${heartbeatMsg}`);
				// 重置心跳定时器
				clearTimeout(heartbeatTimer);
				heartbeatTimer = setTimeout(() => {
					reconnect();
				}, heartbeatInterval);
				return;
			}
			console.log(`收到消息: ${event.data}`);
			// 如果是其他消息，则根据业务逻辑进行处理
		});

		// 监听连接关闭事件
		ws.addEventListener("close", (event) => {
			clearTimeout(heartbeatTimer);
			console.log(`WebSocket 连接已断开: ${event.code}, ${event.reason}`);
			if (shouldReconnect && reconnectAttempts < maxReconnectAttempts) {
				reconnectAttempts++;
				console.log(`正在尝试第 ${reconnectAttempts} 次重连...`);
				setTimeout(() => {
					connect();
				}, reconnectInterval);
			}
		});

		// 监听错误事件
		ws.addEventListener("error", (error) => {
			clearTimeout(heartbeatTimer);
			console.error(`WebSocket 错误: ${error.message}`);
			if (shouldReconnect && reconnectAttempts < maxReconnectAttempts) {
				reconnectAttempts++;
				console.log(`正在尝试第 ${reconnectAttempts} 次重连...`);
				setTimeout(() => {
					connect();
				}, reconnectInterval);
			}
		});
	}

	function reconnect() {
		shouldReconnect = true;
		connect();
	}

	function disconnect() {
		shouldReconnect = false;
		ws.close();
	}

	connect();

	return {
		reconnect,
		disconnect,
		send: (data) => ws.send(data),
	};
}

// 使用示例
const url = "ws://example.com/socket";
const socket = createWebSocket(url, {
	heartbeatMsg: "ping",
	heartbeatInterval: 30000,
	reconnectInterval: 1000,
	maxReconnectAttempts: 10,
});

// 发送消息
socket.send("hello");

// 重连
socket.reconnect();

// 断开连接
socket.disconnect();
