// pages/use_pocket/use_pocket.js
var app = getApp()
var network = require("../../utils/network.js")
var event = require('../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    red_list: [],
    is_open: [],
    page: 1,
    total: '',
    price: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '使用红包',
    })
    this.data.price = options.total
    this.getRedpocketList(this)
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
    this.getRedpocketList(this)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.total != this.data.red_list.length) {
      this.data.page++
      this.getRedpocketList(this)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 获取红包列表
   */
  getRedpocketList: function (that) {
    network.httpGet(app.globalData.member_order_redpacket_list,
      {
        user_id: app.globalData.user_id,
        price: that.data.price,
        page: that.data.page
      },
      function success(res) {
        if (that.data.page == 1) {
          that.setData({
            red_list: res.data.data,
            total: res.data.total
          })
        } else {
          that.setData({
            red_list: res.data.data,
            total: that.data.red_list.concat(res.data.total)
          })
        }
        that.data.is_open = []
        for (var i = 0; i < that.data.red_list.length; i++) {
          that.data.is_open.push(false)
        }
        that.setData({
          is_open: that.data.is_open
        })
      })
  },
  /**
 * 展开标签
 */
  opentip: function (e) {
    var that = this
    this.data.is_open[e.currentTarget.dataset.index] = !this.data.is_open[e.currentTarget.dataset.index]
    this.setData({
      is_open: that.data.is_open
    })
  },
  /**
   * 选择红包
   */
  chooseRed: function (e) {
    var redpocket = JSON.stringify(e.currentTarget.dataset.item);
    event.emit('changeRedpocket', redpocket);
    wx.navigateBack()
  }
})  