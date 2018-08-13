// 引入API模块,请求接口
const api = require('../../api/api.js');
const app = getApp();
// 小程序处理后台返回的dom结构需要引入 htmlToWxml.js
const htmlToWxml = require('../../libraries/htmlToWxml.js');
Page({
  data: {
     newsId:'',
	   wxml: {}
  },
  onLoad: function (options) {
    console.log(options);
    const that = this;
    that.setData({
      newsId: options.newsId
    })
    // 调用详情API
    api.getDetail(that.data.newsId, that);
  }
  // ,
  // onPullDownRefresh:function(){
  //   const that = this;
  //   api.getDetail(that.data.newsId, that);
  //   console.log('下拉刷新咯');
  // }
})
