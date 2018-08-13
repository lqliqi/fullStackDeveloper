// pages/use_coupon/use_coupon.js
var app = getApp()
var network = require("../../utils/network.js")
var event = require('../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop_id: '',
    price: '',
    page: 1,
    coupon_list: [],
    is_open: [],
    total: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '店铺优惠券',
    })
    this.data.shop_id = options.shop_id
    this.data.price = options.total
    this.getCouponList(this)
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
    this.data.page = 1
    this.getCouponList(this)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.total != this.data.coupon_list.length) {
      this.data.page++
      this.getCouponList(this)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 获取可使用优惠券
   */
  getCouponList: function (that) {
    network.httpGet(app.globalData.member_order_coupon_list,
      {
        user_id: app.globalData.user_id,
        shop_id: that.data.shop_id,
        price: that.data.price,
        page: that.data.page
      },
      function success(res) {
        console.log(res.data.total)
        if (that.data.page == 1) {
          that.setData({
            coupon_list: res.data.data,
            total: res.data.total
          })
        } else {
          that.setData({
            coupon_list: that.data.coupon_list.concat(res.data.data)
          })
        }
        that.data.is_open = []
        for (var i = 0; i < that.data.coupon_list.length; i++) {
          that.data.is_open.push(false)
        }
        that.setData({
          is_open: that.data.is_open
        })
      })
  },
  /**
   * 展开标签
   */
  opentip: function (e) {
    var that = this
    this.data.is_open[e.currentTarget.dataset.index] = !this.data.is_open[e.currentTarget.dataset.index]
    this.setData({
      is_open: that.data.is_open
    })
  },
  /**
   * 选择优惠券
   */
  choose: function (e) {
    var coupon = JSON.stringify(e.currentTarget.dataset.item);
    event.emit('changeCoupon', coupon);
    wx.navigateBack()
  }
})