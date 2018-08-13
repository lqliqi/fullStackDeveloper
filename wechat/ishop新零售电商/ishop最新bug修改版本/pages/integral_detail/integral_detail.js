// pages/integral_detail/integral_detail.js
var app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    page: 1,
    type: 0,
    detail_list: [],
    //数据总数量
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '积分明细',
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
    if (this.data.total != this.data.detail_list.length) {
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
   * 点击全部
   */
  all: function () {
    this.setData({
      currentTab: 0
    })
    this.data.page = 1
    this.data.type = 0
    this.getData(this)
  },
  /**
   * 点击获得
   */
  obtain: function () {
    this.setData({
      currentTab: 1
    })
    this.data.page = 1
    this.data.type = 1
    this.getData(this)
  },
  /**
   * 点击支出
   */
  expend: function () {
    this.setData({
      currentTab: 2
    })
    this.data.page = 1
    this.data.type = 2
    this.getData(this)
  },
  /**
   * 获取数据
   */
  getData: function (that) {
    network.httpGet(app.globalData.integral_details_list,
      {
        page: that.data.page,
        type: that.data.type,
        user_id: app.globalData.user_id
      },
      function success(res) {
        if (that.data.page == 1) {
          that.setData({
            detail_list: res.data.data,
            total: res.data.total
          })
        } else {
          that.setData({
            detail_list: that.data.detail_list.concat(res.data.data)
          })
        }
      }
    )
  }
})