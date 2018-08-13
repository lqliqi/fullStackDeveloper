// pages/wx_pay/wx_pay.js
var app = getApp()
var network = require("../../utils/network.js")
var event = require('../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    network.httpGet(app.globalData.auction_create_order, '', function success(res) {
      console.log(res)
      var body = 'xiaochengxu|' + app.globalData.user_id + '|' + options.goods_id
      //预支付
      network.httpGet(app.globalData.prepayment,
        {
          body: body,
          price: options.bond_pay,
          // price: 0.01,
          order_number: res.data,
          openid: app.globalData.openid
        },
        function success(res) {
          console.log(res)
          wx.requestPayment({
            timeStamp: res.timeStamp + '',
            nonceStr: res.nonceStr,
            package: 'prepay_id=' + res.package,
            signType: 'MD5',
            paySign: res.signX,
            success: function (res) {
              console.log(res)
              event.emit('pay_success', app.globalData.auction_scence + app.globalData.user_id + '&id=' + options.goods_id)
              wx.navigateBack()
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000
              })
            },
            fail: function (res) {
              wx.navigateBack()
              wx.showToast({
                title: '支付失败',
                icon: 'none',
                duration: 2000
              })
            }
          })
        })
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

  }
})