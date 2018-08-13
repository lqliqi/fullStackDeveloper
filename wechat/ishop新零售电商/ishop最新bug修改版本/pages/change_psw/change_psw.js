// pages/change_psw/change_psw.js
var network = require("../../utils/network.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: '',
    focus: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '修改支付密码',
    })
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
   * 点击设置密码弹出键盘
   */
  setPassword: function () {
    this.setData({
      focus: true,
    })
  },
  /**
   * 密码输入
   */
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
    if (this.data.password.length == 6) {
      this.payPswVertify(this)
    }
  },
  /**
   * 验证旧密码
   */
  payPswVertify: function (that) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.pay_psw_vertify,
      method: 'POST',
      data: {
        pay_pass: that.data.password,
        user_id: app.globalData.user_id
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.code == 200) {
          wx.redirectTo({
            url: '../set_password/set_password?old=' + that.data.password,
          })
        } else {
          wx.showToast({ title: res.data.message, icon: 'none', duration: 1000, mask: true })
        }
      }
    })
  }
})