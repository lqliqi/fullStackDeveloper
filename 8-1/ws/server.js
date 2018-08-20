const http = require('http');
const io = require('socket.io');
const port = 8080;


// 1.创建http 服务
const httpServer = http.createServer();
httpServer.listen(port);
console.log(`端口为: ${port}服务器启动`);


// 2.ws 服务
const wsServer = io.listen(httpServer);
wsServer.on('connection',(sock) =>{
    sock.emit
    sock.on('a',(n1,n2,n3,n4,n5)=>{
        console.log(n1,n2,n3,n4,n5);
    });
}); 