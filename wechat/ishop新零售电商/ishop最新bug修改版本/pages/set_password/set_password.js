// pages/set_password/set_password.js
var app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: '',
    focus: false,
    first_password: '',
    message: '',
    old_password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //修改密码
    if (options.old != null) {
      this.data.old_password = options.old
    }
    if (options.psw == null) {
      wx.setNavigationBarTitle({
        title: '设置密码',
      })
      this.setData({
        message: '设置6位数字支付密码'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '确认支付密码'
      })
      this.setData({
        message: '再次输入确定'
      })
      this.data.first_password = options.psw
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
    //
    if (this.data.password.length == 6) {
      //确认密码
      if (this.data.first_password != '') {
        if (this.data.password == this.data.first_password) {
          if (this.data.old_password != '') {
            this.changePsw(this)
          } else {
            this.pswCreate(this)
          }
        } else {
          //密码不一致
          wx.redirectTo({
            url: '../set_password/set_password?old=' + this.data.old_password,
          })
          wx.showToast({ title: '两次密码输入不相同,请重新输入', icon: 'none', duration: 1000, mask: true })
        }
      } else {
        //第一次输入密码
        wx.redirectTo({
          url: '../set_password/set_password?psw=' + this.data.password + '&old=' + this.data.old_password,
        })
      }
    }
  },
  /**
   * 设置支付密码
   */
  pswCreate: function (that) {
    network.httpPost(app.globalData.pay_psw_create,
      {
        pay_pass: that.data.password,
        user_id: app.globalData.user_id
      },
      function success(res) {
        wx.navigateBack()
        wx.showToast({ title: '成功', icon: 'success', duration: 1000, mask: true })
      })
  },
  /**
   * 重置支付密码
   */
  changePsw: function (that) {
    network.httpPost(app.globalData.update_pay_psw,
      {
        new_pass: that.data.password,
        pay_pass: that.data.old_password,
        user_id: app.globalData.user_id
      },
      function success(res) {
        wx.navigateBack()
        wx.showToast({ title: '成功', icon: 'success', duration: 1000, mask: true })
      })
  }
})