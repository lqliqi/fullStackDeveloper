const fs = require('fs');
/*
fs.readFile('../data/1.txt',(err,data)=>{
    if(err){
        console.log('读取文件失败了');
    }else{
        console.log('读取文件成功了');
        console.log(data.toString());
    }
});*/



 fs.writeFile('../data/2.txt','随便写一些文字',(err)=>{
     if(err){
         console.log('写入出错');
     }else {
         console.log('写入成功');
     }
 });