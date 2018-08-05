define(function (require, exports, module) {
   let moda = require('./a.js');
   let modb = require('./b.js');

   exports.res = moda.num + modb.num2;
});