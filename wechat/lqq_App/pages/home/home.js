// 引入API模块,请求接口
const api = require('../../api/api.js');
//获取应用实例
const app = getApp();
// page()，页面实例
Page({
  data: {
    height: '', // scroll-view 高度
    current:0, // 当前选择的菜单
    pageIndex:0, // 当前页
    loadMore: 0, // 0:初始加载，1:加载更多
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    news: [],
    newsMenu:[
      {
        "id": 0,
        "title":"篮球资讯"
      }, 
      {
        "id": 1,
        "title": "BCBC进程"
      }, 
      {
        "id": 2,
        "title": "人物故事"
      }
      ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000
  },
  // 选择赛事类型
  selectMenu: function(e) {
    const type = e.target.dataset.type;
    const that = this;
    that.setData({
      pageIndex: 0,
      loadMore:0
    })

    console.log('type: ' + type);
    if (that.data.current == type){
      return;
    }else{
      that.setData({
        current:type
      })
    }
    // 根据选择的赛事类型调用接口
    api.getNewList(that, that.data.loadMore, that.data.pageIndex);
  },
  // 跳转新闻详情
  goToNewsDetail:function(e){
    const newsId = e.currentTarget.id;
    wx.navigateTo({
      url: '../detail/detail?newsId='+newsId
    });
  },
  lower:function(){
    const that = this;
    let pageIndex = that.data.pageIndex;
    pageIndex ++;
    that.setData({
      pageIndex: pageIndex,
      loadMore:1
    });
    api.getNewList(that, that.data.loadMore, that.data.pageIndex);
    console.log('加载更多数据...');
  },
  onLoad: function (options) {
     // 调用请求新闻列表函数
    const that = this;
    api.getNewList(that, that.data.loadMore, that.data.pageIndex);
  
  },
  onPullDownRefresh:function (options){
      // 下拉刷新数据哦
      const that = this;
      that.setData({
        loadMore: 0,
        pageIndex: 0
      });
      api.getNewList(that, that.data.loadMore, that.data.pageIndex);
   },
  onShareAppMessage:function(options){
    // 支持用户分享
    console.log('谢谢你分享小程序给朋友哦...');
  }

})
