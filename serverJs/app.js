const WebSocket = require("ws");

// 创建一个 WebSocket 服务器
const server = new WebSocket.Server({ port: 8080 });
console.log("服务器启动在8080端口");
// 连接计数器
let connectionCount = 0;

// 当客户端连接成功后，向所有连接的客户端广播消息
server.on("connection", function (socket) {
	// 连接标识
	const id = ++connectionCount;
	console.log(`WebSocket connected (id=${id}).`);

	// 监听客户端发送的消息
	socket.on("message", function (message) {
		console.log(`WebSocket message received from (id=${id}): ${message}`);

		// 广播消息给所有连接的客户端
		server.clients.forEach(function (client) {
			if (client.readyState === WebSocket.OPEN) {
				client.send(message);
			}
		});
	});

	// 监听客户端的连接关闭事件，并输出连接关闭的消息
	socket.on("close", function () {
		console.log(`WebSocket disconnected (id=${id}).`);
	});
});
