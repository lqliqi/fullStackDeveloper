// pages/find_shop/find_shop.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    data: {},
    classify: [],
    currentNavtab: 0,
    page: 1,
    shop_data: [],
    classify_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '发现好店',
    })
    wx.request({
      url: app.globalData.discover_shop_left,
      success: function (res) {
        var c = [];
        c.push({
          id: '',
          title: "全部分类"
        })
        c = c.concat(res.data.data);
        that.setData({
          classify: c,
        })
      }
    })
    that.getData(that)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 切换选项卡
   */
  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
    this.data.classify_id = e.currentTarget.dataset.id;
    this.data.page = 1;
    this.getData(this)
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    this.data.page = 1;
    this.setData({
      data: {},
      shop_data: {}
    })
    this.getData(this)
  },
  /**
   *  上拉加载
   */
  onReachBottom: function () {
    this.data.page++;
    this.getData(this)
  },
  /**
   * 网络加载
   */
  getData: function (that) {
    that.changeHidden();
    wx.request({
      url: app.globalData.discover_shop,
      data: {
        type_id: that.data.classify_id,
        page: that.data.page
      },
      success: function (res) {
        that.changeHidden();
        wx.stopPullDownRefresh();
        if (that.data.page == 1) {
          that.setData({
            data: res.data,
            shop_data: res.data.data.data
          })
        } else {
          that.setData({
            shop_data: that.data.shop_data.concat(res.data.data.data)
          })
        }
        console.log(that.data.shop_data)
      }
    })
  },
  /**
   * 加载框的显示
   */
  changeHidden: function () {
    this.setData({
      hidden: !this.data.hidden
    });
  }
})