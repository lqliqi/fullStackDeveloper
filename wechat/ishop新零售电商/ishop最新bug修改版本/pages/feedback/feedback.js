// pages/feedback/feedback.js
var app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feed_list: [],
    currentTab: -1,
    title: '',
    content: '',
    contact: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '意见反馈',
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
   * 获取数据
   */
  getData: function (that) {
    network.httpGet(app.globalData.feedback_list, '',
      function success(res) {
        that.setData({
          feed_list: res.data
        })
      })
  },
  /**
   * 选择
   */
  chooseType: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.index,
      title: e.currentTarget.dataset.title
    })
  },
  /**
   * 反馈内容
   */
  content: function (e) {
    this.setData({
      content: e.detail.value.replace(/[ ]/g, "")
    })
  },
  /**
   * 联系方式
   */
  contact: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },
  /**
   * 提交
   */
  commit: function () {
    var that = this
    if (this.data.title == '') {
      wx.showToast({ title: '请选择反馈类型', icon: 'none', duration: 1000, mask: true })
      return
    }
    if (this.data.content == '') {
      wx.showToast({ title: '请输入反馈内容', icon: 'none', duration: 1000, mask: true })
      return
    }

    if (this.data.contact != '') {
      var regBox = {
        regEmail: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,//邮箱  
        regMobile: /^0?1[3|4|5|7|8][0-9]\d{8}$/,//手机
      }
      this.data.contact = this.data.contact.replace(/[ ]/g, "");   //去掉所有空格  
      var mflag = regBox.regMobile.test(this.data.contact);
      var eflag = regBox.regEmail.test(this.data.contact);
      if (mflag || eflag) {

      } else {
        wx.showToast({ title: '联系方式格式错误', icon: 'none', duration: 1000, mask: true })
        return
      }
    }

    network.httpPost(app.globalData.feedback_create,
      {
        contact: that.data.contact,
        content: that.data.content,
        type: that.data.title
      },
      function success(res) {
        wx.navigateBack({
          delta: 1
        })
        wx.showToast({ title: '成功', icon: 'success', duration: 1000, mask: true })
      })
  }
})