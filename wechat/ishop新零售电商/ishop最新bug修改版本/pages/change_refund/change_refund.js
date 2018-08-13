// pages/change_refund/change_refund.js
var app = getApp()
var network = require("../../utils/network.js")
var event = require('../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photos: [],
    currentTab: 1,
    num: 3,
    //参数
    amount: '',
    cause: '',
    explain: '',
    order_number: '',
    tracking_number: '',
    type: '',
    id: '',
    //列表索引
    index: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '退换货',
    })
    if (options.is_return != null) {

    }
    this.data.index = options.index
    var item = JSON.parse(options.item)
    console.log(item)
    this.data.order_number = item.shop_order_number
    this.data.tracking_number = item.express_number
    if (this.data.tracking_number == '') {
      this.data.type = 1
    } else {
      this.data.type = 2
      this.setData({
        currentTab: 2
      })
    }

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
   * 选择导航栏
   */
  refundState: function () {
    this.setData({
      currentTab: 1
    })
  },
  /**
   * 选择导航栏
   */
  recordState: function () {
    this.setData({
      currentTab: 2
    })
  },
  /**
   * 选择图片
   */
  choose_photo: function () {
    var that = this
    wx.chooseImage({
      count: that.data.num,
      success: function (res) {
        that.setData({
          photos: that.data.photos.concat(res.tempFilePaths),
          num: that.data.num - parseInt(res.tempFilePaths.length)
        })
        console.log(that.data.num)
      },
    })
  },
  /**
   * 删除图片
   */
  delete: function (e) {
    this.data.photos.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      photos: this.data.photos,
      num: this.data.num + 1
    })
  },
  /**
   * 退款原因
   */
  causeInput: function (e) {
    this.data.cause = e.detail.value
  },
  /**
   * 退款金额
   */
  amountInput: function (e) {
    this.data.amount = e.detail.value
  },
  /**
   * 退款说明
   */
  explainInput: function (e) {
    this.data.explain = e.detail.value
  },
  /**
   * 提交申请
   */
  commit: function () {
    var that = this
    console.log(that.data.type)
    if (this.data.cause == '') {
      wx.showToast({ title: '请输入退款原因', icon: 'none', duration: 1000, mask: true })
      return
    }
    if (this.data.amount == '') {
      wx.showToast({ title: '请输入退款金额', icon: 'none', duration: 1000, mask: true })
      return
    }
    if (this.data.explain == '') {
      wx.showToast({ title: '请输入退款说明', icon: 'none', duration: 1000, mask: true })
      return
    }

    network.httpPost(app.globalData.member_order_refund,
      {
        amount: that.data.amount,
        cause: that.data.cause,
        explain: that.data.explain,
        order_number: that.data.order_number,
        tracking_number: that.data.tracking_number,
        type: that.data.type,
        user_id: app.globalData.user_id
      },
      function success(res) {
        console.log(res)
        wx.showLoading({
          title: '加载中...',
        })
        that.data.id = res.tuikuanId
        that.uploadImage(0)
      })


  },
  /**
   * 上传图片
   */
  uploadImage: function (i) {
    var that = this
    var length = that.data.photos.length - 1
    if (i <= length) {
      const uploadTask = wx.uploadFile({
        url: app.globalData.upload_image,
        filePath: that.data.photos[i],
        name: 'img',
        formData: {
          type: 1,
          id: that.data.id
        },
        success: function (res) {
          that.uploadImage(i + 1)
        }
      })

    } else {
      wx.hideLoading()
      wx.navigateBack()
      event.emit('remove', that.data.index)
      wx.showToast({ title: '成功', icon: 'success', duration: 1000, mask: true })
    }
  }
})