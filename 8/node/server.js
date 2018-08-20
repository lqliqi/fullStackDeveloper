const http = require('http');
const port = 8080;
const server = http.createServer(function (req,res) {
    // console.log('有人来请求我');


    //request  --------------  请求 ----输入   请求信息 --- 哪个地址、时间、ip、方法
    //responose -------------  响应 ----输出


});
server.listen(port);
console.log('监听'+port+'端口成功');
