// pages/refund/refund.js
var app = getApp()
var network = require("../../utils/network.js")
var event = require('../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    logistics_company: '',
    code: '',
    tracking_number: '',
    id: '',
    //订单列表索引
    index: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '退货给卖家',
    })
    this.data.index = options.index
    this.data.id = options.id
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
   * 选择物流公司
   */
  bindPickerChange: function (e) {
    this.setData({
      logistics_company: this.data.array[e.detail.value].name,
      code: this.data.array[e.detail.value].code
    })
  },
  /**
   * 物流单号
   */
  numberInput: function (e) {
    this.data.tracking_number = e.detail.value
  },
  /**
   * 获取数据
   */
  getData: function (that) {
    network.httpGet(app.globalData.express_list, '',
      function success(res) {
        that.setData({
          array: res.data
        })
      })
  },
  /**
   * 提交信息
   */
  commit: function () {
    var that = this
    if (this.data.code == '') {
      wx.showToast({ title: '请选择物流公司', icon: 'none', duration: 1000, mask: true })
      return
    }
    if (this.data.tracking_number == '') {
      wx.showToast({ title: '请输入快递单号', icon: 'none', duration: 1000, mask: true })
      return
    }
    console.log(that.data.id)
    network.httpPost(app.globalData.refund_commit,
      {
        id: that.data.id,
        tracking: that.data.code,
        tracking_number: that.data.tracking_number
      },
      function success(res) {
        event.emit('changeStatus', that.data.index)
        wx.navigateBack({
          delta: 2
        })
      })
  }
})