// pages/integral/integral.js
var app = getApp()
var network = require("../../utils/network.js")
var event = require('../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    integral: '',
    integral_list: [],
    address: '',
    total: 0,
    //兑换后更新积分
    refresh: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '积分',
    })
    this.getData(this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    event.on('refresh', this, function () {
      this.getData(this)
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.refresh) {
      this.onPullDownRefresh()
      this.data.refresh = false
    }
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
    event.remove('refresh', this)
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
    network.httpGet(app.globalData.integra_list,
      {
        page: that.data.page,
        user_id: app.globalData.user_id
      },
      function success(res) {
        if (that.data.page == 1) {
          that.setData({
            integral_list: res.data.data,
            integral: res.integral,
            address: res.address,
            total: res.data.total
          })
        } else {
          that.setData({
            integral_list: that.data.integral_list.concat(res.data.data)
          })
        }
      })
  },
  /**
   * 兑换
   */
  exchange: function (e) {
    if (this.data.integral < e.currentTarget.dataset.item.price) {
      wx.showToast({ title: '您的积分不足,无法兑换', icon: 'none', duration: 1000, mask: true })
    } else {
      var item = JSON.stringify(e.currentTarget.dataset.item);
      var address = JSON.stringify(this.data.address);
      wx.navigateTo({
        url: '../integral_exchange/integral_exchange?item=' + item + '&address=' + address + '&integral=' + this.data.integral,
      })
    }
  }
})
