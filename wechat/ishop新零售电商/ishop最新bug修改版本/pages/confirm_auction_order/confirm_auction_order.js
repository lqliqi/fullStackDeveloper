// pages/confirm_auction_order/confirm_auction_order.js
var app = getApp()
var network = require("../../utils/network.js")
var event = require('../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    item: {},
    index: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '确认订单',
    })
    this.setData({
      item: JSON.parse(options.item),
      index: options.index
    })
    console.log(this.data.item)
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
   * 提交订单
   */
  commit: function () {
    var that = this
    if (!this.data.address.name) {
      wx.showToast({ title: '请填写收货地址', icon: 'none', duration: 1000, mask: true })
      return
    }

    network.httpGet(app.globalData.auction_order_address,
      {
        id: that.data.item.id,
        address_name: that.data.address.name,
        address_phone: that.data.address.phone,
        address_area: that.data.address.area_info,
        address_site: that.data.address.address
      },
      function success(res) {
        var body = 'auction|' + app.globalData.user_id + '|' + that.data.item.goods_id
        //预支付
        network.httpGet(app.globalData.prepayment,
          {
            body: body,
            // price: '0.01',
            price: that.data.item.price,
            openid: app.globalData.openid,
            order_number: that.data.item.order_number
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
                wx.navigateBack()
                event.emit('waitReceive')
                wx.showToast({
                  title: '支付成功',
                  icon: 'success',
                  duration: 2000
                })
              },
              fail: function (res) {
                wx.showToast({
                  title: '支付失败',
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          })
      })
  }
})