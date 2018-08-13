// pages/integral_exchange/integral_exchange.js
var app = getApp()
var network = require("../../utils/network.js")
var event = require('../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    item: '',
    integral: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '兑换商品',
    })
    var address = JSON.parse(options.address);
    var item = JSON.parse(options.item);
    this.setData({
      address: address,
      item: item,
      integral: options.integral
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
   * 兑换
   */
  exchange: function () {
    var that = this
    if (this.data.address == '') {
      wx.showToast({ title: '请选择收货地址', icon: 'none', duration: 1000, mask: true })
      return
    }
    network.httpPost(app.globalData.integral_conversion,
      {
        address: that.data.address.address,
        area_info: that.data.address.area_info,
        goods_id: that.data.item.id,
        name: that.data.address.name,
        number: 1,
        phone: that.data.address.phone,
        picUrl: that.data.item.picUrl,
        title: that.data.item.title,
        user_id: app.globalData.user_id
      },
      function success(res) {
        var pages = getCurrentPages()    //获取加载的页面( 页面栈 )
        var prevPage = pages[pages.length - 2]    //获取上一个页面
        // 设置上一个页面的数据（可以修改，也可以新增）
        prevPage.setData({
          refresh: true
        })
        wx.navigateBack({
          delta: 1
        })
        event.emit('refresh', '')
        wx.showToast({ title: '成功', icon: 'succes', duration: 1000, mask: true })
      })
  }
})