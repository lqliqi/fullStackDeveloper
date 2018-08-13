// pages/commission/commission.js
var app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    commission: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '佣金',
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
    this.getData(this)
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
    that.changeHidden()
    wx.request({
      url: app.globalData.commsition_index,
      data: {
        user_id: app.globalData.user_id
      },
      success: function (res) {
        that.changeHidden()
        that.setData({
          commission: res.data.data
        })
      }
    })
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
   * 加载框的显示
   */
  changeHidden: function () {
    this.setData({
      hidden: !this.data.hidden
    });
  }
})