// pages/sigh_in/sign_in.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    week_head: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    year: '',
    month: '',
    day: '',
    month_day: [],
    //总积分
    integral: '',
    //是否签到
    status: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '签到领积分',
    })
    var array_day = [];
    var now = new Date();
    var day = now.getDay();
    var arr_week = new Array("星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    var week = arr_week[day];
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();

    var date = new Date(y, m, 0);
    for (var i = 1; i < date.getDay() - 1; i++) {
      array_day.push('');
    }
    for (var i = 1; i <= date.getDate(); i++) {
      array_day.push(i);
    }
    this.setData({
      year: y,
      month: m,
      day: d,
      month_day: array_day
    })
    this.getData(this)
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
   * 签到
   */
  sign: function () {
    var that = this
    if (that.data.status == 0) {
      var network = require("../../utils/network.js")
      network.httpGet(app.globalData.sign, {
        user_id: app.globalData.user_id
      }, function success(res) {
        that.getData(that)
        wx.showToast({ title: '签到成功', icon: 'success', duration: 1000, mask: true })
      })

    }

  },
  /**
   * 获取数据
   */
  getData: function (that) {
    var network = require("../../utils/network.js")
    network.httpGet(app.globalData.member_sign_index, {
      user_id: app.globalData.user_id
    }, function success(res) {
      console.log(res)
      that.setData({
        integral: res.integral,
        status: res.status
      })
    })
  }
})