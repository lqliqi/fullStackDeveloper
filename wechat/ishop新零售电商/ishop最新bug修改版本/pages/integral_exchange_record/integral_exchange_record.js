// pages/integral_exchange_record/integral_exchange_record.js
var network = require("../../utils/network.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    integral_list: [],
    page: 1,
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '兑换记录',
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
    if (this.data.total != this.data.integral_list.length) {
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
    network.httpGet(app.globalData.integral_history,
      {
        user_id: app.globalData.user_id
      },
      function success(res) {
        console.log(res)
        if (that.data.page == 1) {
          that.setData({
            total: res.data.total,
            integral_list: res.data.data
          })
        } else {
          that.setData({
            integral_list: that.data.integral_list.concat(res.data.data)
          })
        }

      })
  },
  /**
   * 确认收货
   */
  commit: function (e) {
    console.log(e.currentTarget.dataset.item)
    var that = this
    network.httpPost(app.globalData.confirm_receipt,
      {
        id: e.currentTarget.dataset.item.id,
        user_id: app.globalData.user_id
      },
      function success(res) {
        for (var i = 0; i < that.data.integral_list.length; i++) {
          if (that.data.integral_list[i].id == e.currentTarget.dataset.item.id) {
            that.data.integral_list[i].status = 3
          }
        }
        that.setData({
          integral_list: that.data.integral_list
        })
        wx.showToast({ title: '成功', icon: 'succes', duration: 1000, mask: true })
      })
  }
})