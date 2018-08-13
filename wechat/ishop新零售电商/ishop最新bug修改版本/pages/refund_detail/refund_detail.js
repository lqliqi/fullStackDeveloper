// pages/refund_detail/refund_detail.js
var app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    order_number: '',
    //订单列表的索引
    index: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '退款详情',
    })
    if (options.index != null) {
      this.data.index = options.index
    }
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
   * 查看物流
   */
  logistics: function () {
    wx.navigateTo({
      url: '../logistics_info/logistics_info?picUrl=' + this.data.detail.thumb_img + '&express_value=' + this.data.detail.tracking + '&express_number=' + this.data.detail.tracking_number + '&num=' + this.data.detail.number,
    })
  },
  /**
   * 退货给卖家
   */
  sale_return: function () {
    wx.navigateTo({
      url: '../refund/refund?id=' + this.data.detail.id + '&index=' + this.data.index,
    })
  },
  /**
   * 获取数据
   */
  getData: function (that) {
    network.httpGet(app.globalData.member_order_refund_detail,
      {
        order_number: that.data.order_number,
        user_id: app.globalData.user_id
      },
      function success(res) {
        that.setData({
          detail: res.data
        })
        console.log(res)
      })
  }
})