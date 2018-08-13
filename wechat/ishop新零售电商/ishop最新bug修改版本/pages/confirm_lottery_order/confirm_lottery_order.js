// pages/confirm_lottery_order/confirm_lottery_order.js
var app = getApp()
var network = require("../../utils/network.js")
var event = require('../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    item: {},
    index: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '确认订单',
    })
    this.setData({
      index: options.index,
      item: JSON.parse(options.item)
    })
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
   * 兑换
   */
  commit: function () {
    var that = this
    if (!this.data.address.name) {
      wx.showToast({ title: '请选择地址', icon: 'none', duration: 1000, mask: true })
    } else {
      network.httpGet(app.globalData.confirm_lottery_context,
        {
          address_area: that.data.address.area_info,
          address_name: that.data.address.name,
          address_phone: that.data.address.phone,
          address_site: that.data.address.address,
          order_id: that.data.item.id
        },
        function success(res) {
          event.emit('remove', that.data.index)
          wx.navigateBack()
          wx.showToast({
            title: '领取成功',
          })
        })
    }
  }
})