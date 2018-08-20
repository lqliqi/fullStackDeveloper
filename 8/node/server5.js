const http = require('http');
const fs = require('fs');
const port = 8080;
const server = http.createServer( (req,res) =>{
    // req.url  ===> 'a.html'  === >  'www/a.html'
    // req.url  ===> 'a.html'  === >  'www/a.html'
    // req.url  ===> 'aaa/bbb/1.html'  === >  'www/aaa/bbb/1.html'

    fs.readFile(`../www${req.url}`,(err,data)=>{
       if(err){
          fs.readFile('../http_errors/404.html',(err,data)=>{
              if(err){
                  res.writeHeader(404); // 确保机器能识别
                  res.write('Not Found');
              }else{
                  // res.writeHeader(404); // 确保机器能识别
                  res.write(data);
              }
              res.end();
          })
       }else{
           res.write(data);
           res.end();
       }
    });
});
server.listen(port);
console.log('监听'+port+'端口成功');
