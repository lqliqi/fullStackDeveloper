// 小程序处理后台返回的dom结构需要引入 htmlToWxml.js
const htmlToWxml = require('../libraries/htmlToWxml.js');
// 获取微信实例
const app = getApp();
// 请求新闻列表
const getNewList = function (that, loadMore, pageIndex) {
  const sendNewsData = {
    "sn": (new Date()).valueOf(),
    "service": "news",
    "method": "news",
    "params": {
      "type": that.data.current,
      "pageIndex": pageIndex
    }
  };
  wx.request({
    url: app.globalData.apiUrl, //仅为示例，并非真实的接口地址
    method: 'POST',
    data: 'body=' + JSON.stringify(sendNewsData),
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      const news = res.data.entity.news;
      if (loadMore == 0) {
        console.log('初始加载');
        wx.showLoading({
          //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
          title: '加载中',
          icon: 'loading',
        });
        setTimeout(() => {
          that.setData({
            news: news
          });
          wx.hideLoading();
        }, 1500)
      } else {
        const thatNews = that.data.news;
        // concat:js 方法，用于连接两个数组
        const cont = thatNews.concat(news);
        wx.showLoading({
          //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
          title: '加载中',
          icon: 'loading',
        });
        setTimeout(() => {
          that.setData({
            news: cont
          });
          wx.hideLoading();
        }, 1500)
        console.log('上拉加载更多..');
      }

    }
  })
};
// 获取详情API
const getDetail = function (newsId, that) { 
  const sendData = {
    "sn": (new Date()).valueOf(),
    "service": "news",
    "method": "detail",
    "params": {
      "newsId": newsId
    }
  };
  wx.request({
    url: app.globalData.apiUrl,
    method: 'POST',
    data: 'body=' + JSON.stringify(sendData),
    header: { // 使用post 请求，必须修改content-type
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      console.log(res.data);
      let wxml = htmlToWxml.html2json(res.data.entity.news.content);
      console.log(wxml);
      that.setData({
        wxml: wxml
      });
    }
  })
};

// 暴露接口
module.exports = {
  getNewList: getNewList,
  getDetail: getDetail
}