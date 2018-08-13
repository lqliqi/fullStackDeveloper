// pages/my/my.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    info: {},
    grade: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的',
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
   * 待付款
   */
  obligation: function () {
    wx.navigateTo({
      url: '../order_list/order_list?index=' + 1,
    })
  },
  /**
   * 待收货
   */
  receiving: function () {
    wx.navigateTo({
      url: '../order_list/order_list?index=' + 2,
    })
  },
  /**
   * 待评价
   */
  evaluate: function () {
    wx.navigateTo({
      url: '../order_list/order_list?index=' + 3,
    })
  },
  /**
   * 退换货
   */
  refund: function () {
    wx.navigateTo({
      url: '../order_list/order_list?index=' + 4,
    })
  },
  /**
   * 全部订单
   */
  all: function () {
    wx.navigateTo({
      url: '../order_list/order_list?index=' + 0,
    })
  },
  /**
   * 佣金
   */
  commission: function () {
    wx.navigateTo({
      url: '../commission/commission',
    })
  },
  /**
   * 优惠券
   */
  coupon: function () {
    wx.navigateTo({
      url: '../coupon/coupon',
    })
  },
  /**
   * 红包
   */
  redpocket: function () {
    wx.navigateTo({
      url: '../redpocket/redpocket',
    })
  },
  /**
   * 积分
   */
  integral: function () {
    var integral = this.data.info.integral
    wx.navigateTo({
      url: '../integral/integral?integral=' + integral,
    })
  },
  /**
   * 分销商
   */
  distributor: function () {
    wx.navigateTo({
      url: '../distributor/distributor',
    })
  },
  /**
   * 分销订单
   */
  distributors_orders: function () {
    wx.navigateTo({
      url: '../distributors_orders/distributors_orders',
    })
  },
  /**
   * 我的拍卖
   */
  auction: function () {
    wx.navigateTo({
      url: '../auction/auction',
    })
  },
  /**
   * 我的抽奖
   */
  lotto: function () {
    wx.navigateTo({
      url: '../lotto/lotto',
    })
  },
  /**
   * 
   */
  getData: function (that) {
    that.changeHidden()
    wx.request({
      url: app.globalData.member_my_list,
      data: {
        user_id: app.globalData.user_id
      },
      success: function (res) {
        that.changeHidden()
        console.log(res)
        that.setData({
          info: res.data.data
        })
        switch (res.data.data.level) {
          case '一级会员':
            that.data.grade = 1
            break;
          case '二级会员':
            that.data.grade = 2
            break;
          case '三级会员':
            that.data.grade = 3
            break;
          case '四级会员':
            that.data.grade = 4
            break;
          case '五级会员':
            that.data.grade = 5
            break;
          case '六级会员':
            that.data.grade = 6
            break;
          case '七级会员':
            that.data.grade = 7
            break;
          case '八级会员':
            that.data.grade = 8
            break;
          case '九级会员':
            that.data.grade = 9
            break;
        }
        that.setData({
          grade: that.data.grade
        })
      }
    })
  },
  /**
   * 二维码
   */
  qr_scan:function(){
    wx.navigateTo({
      url: '../my_qrcode/my_qrcode',
    })
  },
  /**
 * 加载框的显示
 */
  changeHidden: function () {
    this.setData({
      hidden: !this.data.hidden
    });
  },
})