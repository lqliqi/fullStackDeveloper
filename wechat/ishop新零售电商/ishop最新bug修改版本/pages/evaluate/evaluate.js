// pages/evaluate/evaluate.js
var app = getApp()
var network = require("../../utils/network.js")
var event = require('../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photos: [],
    shop_id: '',
    shop_title: '',
    num: 6,
    star_num: 1,
    message: '',
    item: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '发表评论',
    })
    this.setData({
      item: JSON.parse(options.item),
      shop_id: options.shop_id,
      shop_title: options.shop_title
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
   * 1星
   */
  oneStar: function () {
    this.setData({
      star_num: 1
    })
  },
  /**
  * 2星
  */
  twoStar: function () {
    this.setData({
      star_num: 2
    })
  },
  /**
  * 3星
  */
  threeStar: function () {
    this.setData({
      star_num: 3
    })
  },
  /**
  * 4星
  */
  fourStar: function () {
    this.setData({
      star_num: 4
    })
  },
  /**
  * 5星
  */
  fiveStar: function () {
    this.setData({
      star_num: 5
    })
  },
  /**
   * 评价内容
   */
  messageInput: function (e) {
    this.setData({
      message: e.detail.value.replace(/[ ]/g, "")
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
   * 评价
   */
  evaluate: function () {
    var that = this

    if (this.data.message == '') {
      wx.showToast({ title: '请输入评价内容', icon: 'none', duration: 1000, mask: true })
      return
    }

    network.httpPost(app.globalData.shop_goods_evaluate,
      {
        attr: that.data.item.attr,
        content: that.data.message,
        goods_id: that.data.item.goods_id,
        grade: that.data.star_num,
        order_number: that.data.item.shop_order_number,
        shop_id: that.data.shop_id,
        thumb_img: that.data.item.thumb_img,
        title: that.data.shop_title,
        user_id: app.globalData.user_id
      },
      function success(res) {
        that.uploadImage(0,res.pingjiaId)
      })
  },
  /**
   * 上传图片
   */
  uploadImage: function (i, id) {

    var that = this
    var length = that.data.photos.length - 1
    if (i <= length) {
      const uploadTask = wx.uploadFile({
        url: app.globalData.upload_image,
        filePath: that.data.photos[i],
        name: 'img',
        formData: {
          type: 2,
          id: id
        },
        success: function (res) {
          console.log(i)
          that.uploadImage(i + 1, id)
        }
      })

    } else {
      wx.hideLoading()
      wx.navigateBack()
      event.emit('change', '')
      event.emit('refresh', '')
      wx.showToast({ title: '成功', icon: 'success', duration: 1000, mask: true })
    }
  }
})