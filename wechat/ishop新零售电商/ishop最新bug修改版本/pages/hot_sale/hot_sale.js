// pages/hot_sale/hot_sale.js
var network = require("../../utils/network.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    hot_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '热卖榜',
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
    this.data.page++
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
    network.httpGet(app.globalData.hot_sale_hot_list,
      {
        page: that.data.page
      },
      function success(res) {
        if (that.data.page == 1) {
          that.setData({
            hot_list: res.data.data
          })
        } else {
          that.setData({
            hot_list: that.data.hot_list.concat(res.data.data)
          })
        }
      })
  },
  /**
   * 
   */
  click: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../hot_sale_classify/hot_sale_classify?id=' + e.currentTarget.dataset.item.id,
    })
  }
})