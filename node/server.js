const http = require('http');
const io = require('socket.io');


// 1. 创建http 服务
let httpServer = http.createServer();
httpServer.listen(8080);
console.log('server port is 8080');


// 2. 创建 webSocket 服务

let wsServer = io.listen(httpServer);

wsServer.on('connection',function (sock) {
    // 2. socket 接收请求
  /*  sock.on('a',function (num1,num2) {
        console.log('接到了浏览器发送的数据,'+num1 +','+num2);
    });*/


  // 3. 服务器主动推送信息到浏览器
    setInterval(function () {
        sock.emit('ttt',Math.random());
    },500);
});

