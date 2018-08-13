// pages/message_list/message_list.js
var app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    total: 0,
    message_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '消息',
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
    this.data.page = 1
    this.getData(this)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.total != this.data.message_list.length) {
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
   * 获取数据
   */
  getData: function (that) {
    network.httpGet(app.globalData.message_list,
      {
        page: that.data.page,
        user_id: app.globalData.user_id
      },
      function success(res) {
        console.log(res)
        if (that.data.page == 1) {
          that.setData({
            total: res.data.total,
            message_list: res.data.data,
            title: '消息(' + res.data.total + ')'
          })
          wx.setNavigationBarTitle({
            title: '消息(' + res.data.total + ')'
          })
        } else {
          that.setData({
            message_list: that.data.message_list.concat(res.data.data),
          })
        }
      })
  }
})