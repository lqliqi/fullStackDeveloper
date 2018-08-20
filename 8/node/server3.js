const http = require('http');
const port = 8080;
const server = http.createServer(function (req,res) {
   // 根据req.url 返回不同的东西
    const reqUrl = req.url;
    if(reqUrl == '/aaa'){
        res.write('aaa');
    }else if(reqUrl == '/bbb'){
        res.write('bbb');
    }else {
        res.write('404');
    }

    res.end();
});
server.listen(port);
console.log('监听'+port+'端口成功');
