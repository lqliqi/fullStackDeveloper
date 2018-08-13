// pages/distributors_orders/distributors_orders.js
var app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentNavtab: 0,
    navTab: ["交易中订单", "已完成订单"],
    page: 1,
    total: '',
    info: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '分销订单',
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
    if (this.data.total != this.data.info.length) {
      this.data.page++
      this.getData(this)
    }
  },
  /**
     * 切换选项卡
     */
  switchTab: function (e) {
    this.data.page = 1
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
    this.getData(this)
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
    network.httpGet(app.globalData.member_distribution_order_list,
      {
        page: that.data.page,
        type: that.data.currentNavtab,
        user_id: app.globalData.user_id
      },
      function success(res) {
        console.log(res)
        that.setData({
          total: res.data.total,
          info: res.data.data
        })
      })
  }
})