// pages/order_detail/order_detail.js
var app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    order_number: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单详情',
    })
    this.data.order_number = options.order_number
    this.getData(this)
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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
   * 获取数据
   */
  getData: function (that) {
    network.httpGet(app.globalData.member_order_detail,
      {
        order_number: that.data.order_number,
        user_id: app.globalData.user_id
      },
      function success(res) {
        that.setData({
          detail: res.data
        })
      })
  },
  /**
   * 物流
   */
  logistics: function () {
    var sum = 0
    for (var i = 0; i < this.data.detail.goods.length; i++) {
      sum += this.data.detail.goods[i].number
    }
    wx.navigateTo({
      url: '../logistics_info/logistics_info?picUrl=' + this.data.detail.goods[0].thumb_img + '&express_value=' + this.data.detail.express_value + '&express_number=' + this.data.detail.express_number + '&num=' + sum,
    })
  }
})