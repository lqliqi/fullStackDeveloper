const mysql = require('mysql');

//1.连接
// 连接池
let db = mysql.createPool({host: 'localhost',port: 3306,user: 'root',password: 'liqi8684010MYSQL',database: '20180820'});
// let db = mysql.createConnection({host: 'localhost',port: 3306,user: 'root',password: 'liqi8684010MYSQL',database: '20180820'});


// 2.查询
db.query('SELECT * FROM user_table', (err, data)=>{
    if(err){
        console.log(err);
    }else{
        let tableData = JSON.stringify(data);
        console.log(tableData);
    }
});

