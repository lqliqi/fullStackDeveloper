// pages/coupon_list/coupon_list.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    page: 1,
    shop_id: '',
    is_open: [],
    coupon_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '领取优惠券',
    })
    this.data.shop_id = options.shop_id
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 网络请求
   */
  getCouponList: function (that) {
    that.changeHidden()
    wx.request({
      url: app.globalData.coupon_list,
      data: {
        user_id: app.globalData.user_id,
        shop_id: this.data.shop_id,
        page: that.data.page
      },
      success: function (res) {
        that.changeHidden()
        wx.stopPullDownRefresh()
        if (that.data.page == 1) {
          that.setData({
            coupon_list: res.data.data.data
          })
        } else {
          that.setData({
            coupon_list: that.data.coupon_list.concat(res.data.data.data)
          })
        }
        that.data.is_open = []
        for (var i = 0; i < that.data.coupon_list.length; i++) {
          that.data.is_open.push(false)
        }
        that.setData({
          is_open: that.data.is_open
        })
      }
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
   * 领取优惠券
   */
  getcoupon: function (e) {
    var that = this
    wx.request({
      url: app.globalData.get_coupon,
      data: {
        coupon_id: e.currentTarget.dataset.couponid,
        user_id: app.globalData.user_id
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx.showToast({ title: '领取成功', icon: 'succes', duration: 1000, mask: true })
          that.data.coupon_list[e.currentTarget.dataset.index].receive_status = 1
          that.setData({
            coupon_list: that.data.coupon_list
          })
        } else {
          wx.showToast({ title: res.data.message, icon: 'none', duration: 1000, mask: true })
        }
      }
    })
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