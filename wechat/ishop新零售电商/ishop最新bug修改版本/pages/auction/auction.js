// pages/auction/auction.js
var app = getApp()
var network = require("../../utils/network.js")
var event = require('../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab: ["拍卖中", "待付款", "待收货", "已完成"],
    currentNavtab: 0,
    list: [],
    status: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: '我的拍卖',
    })
    event.on('remove', this, function (index) {

    })
    //待收货
    event.on('waitReceive', this, function () {
      that.setData({
        currentNavtab: 2
      })
      that.getData(that)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getAuctionData(this)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onPullDownRefresh()
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
    event.remove('waitReceive', this)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    if (this.data.currentNavtab == 0) {
      this.getAuctionData(this)
    } else {
      this.getData(this)
    }
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
    switch (e.currentTarget.dataset.idx) {
      case 0:
        this.getAuctionData(this)
        break
      case 1:
        this.data.status = 0
        this.getData(this)
        break
      case 2:
        this.data.status = '1,2'
        this.getData(this)
        break
      case 3:
        this.data.status = 3
        this.getData(this)
        break
    }
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx,
      status: this.data.status
    });
  },
  /**
   * 获取正在拍卖商品列表
   */
  getAuctionData: function (that) {
    network.httpGet(app.globalData.member_aucting_order,
      {
        user_id: app.globalData.user_id,
      },
      function success(res) {
        that.setData({
          list: res.data,
        })
      })
  },
  /**
   * 获取列表
   */
  getData: function (that) {
    network.httpGet(app.globalData.member_auction_order,
      {
        user_id: app.globalData.user_id,
        status: that.data.status,
      },
      function success(res) {
        that.setData({
          list: res.data,
        })
      })
  },
  /**
   * 去竞拍
   */
  goAuction: function (e) {
    console.log(e.currentTarget.dataset.item)
    var url = app.globalData.auction_scence + app.globalData.user_id + '&id=' + e.currentTarget.dataset.item.goods_id
    wx.navigateTo({
      url: '../auction_web/auction_web?id=' + e.currentTarget.dataset.item.goods_id,
    })
  },
  /**
   * 付款
   */
  pay: function (e) {
    var item = e.currentTarget.dataset.item
    var index = e.currentTarget.dataset.index
    console.log(item)
    wx.navigateTo({
      url: '../confirm_auction_order/confirm_auction_order?item=' + JSON.stringify(item) + '&index=' + index,
    })
  },
  /**
   * 确认收货
   */
  recieve: function (e) {
    var that = this
    var item = e.currentTarget.dataset.item
    var index = e.currentTarget.dataset.index
    network.httpGet(app.globalData.confirm_get_goods,
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
      url: '../logistics_info/logistics_info?picUrl=' + item.picUrl + '&express_value=' + item.express_value + '&express_number=' + item.express_number + '&num=' + 1,
    })
  }
})