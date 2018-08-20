const url = require('url');

let str = 'https://www.baidu.com:80/s?tn=94886267_hao_pg&isource=infinity&wd=abc';

let obj = url.parse(str,true);
console.log(obj);