const http = require('http');
const fs = require('fs');
const url = require('url');
const mysql = require('mysql');
const io = require('socket.io');


// 数据库
let db = mysql.createPool({host: 'localhost', user: 'root',password: 'liqi8684010MYSQL','database': '20180820'});

// 1. 创建http服务器
let httpServer = http.createServer((req,res)=>{

    let {pathname, query} = url.parse(req.url, true);
    console.log(pathname);
    console.log(query);

    if(pathname == '/reg'){

        let {user,pass} = query;

        // 1. 校验数据
        if(!/^[a-zA-Z0-9_-]{6,32}$/.test(user)){
            console.log('用户名不符合规范');
            res.write(JSON.stringify({'code': 1,'msg': '用户名不符合规范'}));
            res.end();
        }else if(!/^.{6,32}/.test(pass)){
            console.log('密码不符合规范');
            res.write(JSON.stringify({'code': 1,'msg': '密码不符合规范'}));
            res.end();
        }else{
            console.log('准备数据库写入');
            // 2.检测用户名是否重复
            db.query(`SELECT * FROM user_table WHERE username='${user}'`,(err, data)=>{
                if(err){
                    console.log('数据库有错');
                    res.write(JSON.stringify({'code': 1,'msg': '数据库有错'}));
                    res.end();
                }else if(data.length >0 ) {
                    console.log('此用户名已经存在');
                    res.write(JSON.stringify({'code': 1,'msg': '此用户名已经存在'}));
                    res.end();
                }else {
                    // 3.插入
                    db.query(`INSERT INTO user_table (username,password,online) VALUES('${user}','${pass}',0)`, err=>{
                        if(err){
                            res.write(JSON.stringify({'code': 1,'msg': '数据库有错'}));
                            res.end();
                        }else{
                            console.log('注册成功');
                            res.write(JSON.stringify({'code': 0,'msg': '注册成功'}));
                            res.end();
                        }
                    });
                }
            });
        }


    }else if(pathname == '/login'){

    }else{
     // 请求文件
        fs.readFile(`www${req.url}`,(err,data)=>{
            if(err){
                res.writeHeader(404);
                res.write('Not Found');
            }else{
                res.write(data);
            }
            res.end();
        });
    }
});
httpServer.listen(8080);
console.log('node 服务启动端口 8080');