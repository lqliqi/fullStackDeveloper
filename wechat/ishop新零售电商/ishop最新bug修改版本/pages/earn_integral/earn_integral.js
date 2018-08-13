// pages/earn_integral/earn_integral.js
var app = getApp()
var network = require("../../utils/network.js")
var event = require('../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rule: [],
    status: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '赚取积分',
    })
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
    network.httpGet(app.globalData.member_sign_index,
      {
        user_id: app.globalData.user_id
      },
      function success(res) {
        console.log(res)
        that.setData({
          rule: res.rule,
          status: res.status
        })
      })
  },
  /**
   * 签到
   */
  sign: function () {
    var that = this
    if (that.data.status == 0) {
      network.httpGet(app.globalData.sign, {
        user_id: app.globalData.user_id
      }, function success(res) {
        that.getData(that)
        wx.showToast({ title: '签到成功', icon: 'success', duration: 1000, mask: true })
        event.emit('refresh', '')
      })
    }
  },
})