// pages/my_wallet/my_wallet.js
var app = getApp()
var network = require("../../utils/network.js")
var event = require('../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    device: [{ title: '佣金余额(元)', balance: '0.00', text: '提现' }],
    info: {},
    //佣金提现类型
    //1提现 2转化余额
    way: 1,
    //弹出框
    choose_status: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的钱包',
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
  clickBanner: function (e) {
    // //充值
    // if (e.currentTarget.dataset.index == 0) {
    //   wx.navigateTo({
    //     url: '../recharge/recharge',
    //   })
    // } else {
    //   //提现
    //   this.setData({
    //     choose_status: false
    //   })
    // }
    // wx.navigateTo({
    //   url: '../deposit/deposit',
    // })
  },
  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    if (e.detail.encryptedData != undefined) {
      wx.login({
        success: function (res) {
          console.log(res)
          network.httpPost(app.globalData.my_phone,
            {
              code: res.code,
              encryptedData: e.detail.encryptedData,
              iv: e.detail.iv
            },
            function success(res) {
              console.log(res)
              wx.navigateTo({
                url: '../deposit/deposit?phone=' + res.data.phoneNumber,
              })
            })
        }
      })
    }
  },
  /**
   * 获取数据
   */
  getData: function (that) {

    network.httpGet(app.globalData.my_balance,
      {
        user_id: app.globalData.user_id
      },
      function success(res) {
        console.log(res)
        that.setData({
          info: res.data,
          device: { title: '佣金余额(元)', balance: + res.data.actual_amount, text: '提现' },
        })
      })
  },
  /**
   * 选择提现
   */
  withdraw: function () {
    this.setData({
      way: 1
    })
  },
  /**
   * 选择转化余额
   */
  transform: function () {
    this.setData({
      way: 2
    })
  },
  /**
   * 选择类型确认
   */
  commit: function () {
    if (this.data.way == 1) {
      wx.navigateTo({
        url: '../deposit/deposit',
      })
    } else {
      wx.navigateTo({
        url: '../deposit_balance/deposit_balance?balance=' + this.data.info.actual_amount,
      })
    }
    this.setData({
      choose_status: true
    })
  }
})