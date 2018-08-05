define(function (require, exports, module) {
    // exports
    // exports.a = 12;
    // exports.b = 5;
  /*  exports.show = function(){

    }; */
     // module--- 批量导出

    module.exports = {
        a: 12,
        b: 6,
        show (a,b) {
            alert(a+b);
        }
    };


    // let a = 1;
    // let b = 2;


    // require --- 用来引入其他模块

    
});
