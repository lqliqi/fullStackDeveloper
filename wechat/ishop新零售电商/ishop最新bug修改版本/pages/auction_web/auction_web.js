// pages/auction_web/auction_web.js
var app = getApp()
var event = require('../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    //拍卖现场
    if (options.id != undefined) {
      this.setData({
        src: app.globalData.auction_scence + app.globalData.user_id + '&id=' + options.id
      })

    } else {
      //拍卖首页
      this.setData({
        src: app.globalData.auction_web + '?user_id=' + app.globalData.user_id
      })
      var that = this
      event.on('pay_success', this, function (src) {
        that.setData({
          src: src
        })
      })
    }
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
    event.remove('pay_success', this)
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

  }
})