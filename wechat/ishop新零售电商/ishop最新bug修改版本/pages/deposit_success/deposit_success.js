// pages/deposit_success/deposit_success.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '提现',
    })
    this.setData({
      price: options.money
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
   * 我的钱包 
   */
  go_wallet: function () {
    wx.redirectTo({
      url: '../my_wallet/my_wallet',
    })
  },

  /**
   * 继续充值
   */
  go_desposit: function () {
    wx.redirectTo({
      url: '../deposit/deposit?phone=' + app.globalData.phoneNumber,
    })
  }
})