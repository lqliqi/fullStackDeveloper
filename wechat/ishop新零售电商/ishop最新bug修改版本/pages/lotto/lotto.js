// pages/lotto/lotto.js
var app = getApp()
var network = require("../../utils/network.js")
var event = require('../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab: ["未领取", "待收货", "已完成"],
    currentNavtab: 0,
    page: 1,
    total: '',
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '抽奖记录',
    })
    event.on('remove', this, function (index) {
      this.data.list.splice(index, 1)
      this.setData({
        list: this.data.list
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getData(this)
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
    event.remove('remove', this)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.page = 1
    this.getData(this)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.total != this.data.list.length) {
      this.data.page++
      this.getData(this)
    }
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
    this.data.page = 1
    this.getData(this)
  },
  /**
   * 获取记录
   */
  getData: function (that) {
    network.httpGet(app.globalData.my_lottery,
      {
        status: that.data.currentNavtab,
        user_id: app.globalData.user_id,
        page: that.data.page
      },
      function success(res) {
        that.setData({
          list: res.data.data,
          total: res.data.total
        })
      })
  },
  /**
   * 领取
   */
  drawDown: function (e) {
    console.log(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../confirm_lottery_order/confirm_lottery_order?item=' + JSON.stringify(e.currentTarget.dataset.item) + '&index=' + e.currentTarget.dataset.index,
    })
  },
  /**
   * 确认收货
   */
  commit: function (e) {
    var that = this
    var item = e.currentTarget.dataset.item
    var index = e.currentTarget.dataset.index
    network.httpGet(app.globalData.confirm_lottery,
      {
        order_id: item.id
      },
      function success(res) {
        that.data.list.splice(index, 1)
        that.setData({
          list: that.data.list
        })
        wx.showToast({
          title: '确认收货成功',
        })
      })
  },
  /**
   * 查看物流
   */
  logistics: function (e) {
    var item = e.currentTarget.dataset.item
    console.log(item)
    wx.navigateTo({
      url: '../logistics_info/logistics_info?picUrl=' + item.picUrl + '&express_value=' + item.express_value + '&express_number=' + item.express_number + '&num=1',
    })
  }
})