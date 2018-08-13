// pages/logistics_info/logistics_info.js
var app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    data: false,
    picUrl: '',
    express_value: '',
    express_number: '',
    num: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '物流详情',
    })
    this.setData({
      picUrl: options.picUrl,
      express_value: options.express_value,
      express_number: options.express_number,
      num: options.num
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
    network.httpGet(app.globalData.logistics_detail,
      {
        express_number: that.data.express_number,
        express_value: that.data.express_value
      },
      function success(res) {
        console.log(res)
        that.setData({
          info: res,
          data: true
        })
      })
  }
})