// pages/good_evaluate_list/good_evaluate_list.js
var event = require('../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    shop_id: '',
    shop_title: '',
    //评论的第几个item
    index: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '发表评价',
    })
    this.setData({
      list: JSON.parse(options.list),
      shop_id: options.shop_id,
      shop_title: options.shop_title
    })
    event.on('change', this, function () {
      this.data.list[this.data.index].status = 1
      this.setData({
        list: this.data.list
      })
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
    event.remove('change', this)
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
   * 评论
   */
  evaluate: function (e) {
    console.log(e)
    var item = JSON.stringify(e.currentTarget.dataset.item)
    this.data.index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../evaluate/evaluate?item=' + item + '&shop_id=' + this.data.shop_id
      + '&shop_title=' + this.data.shop_title,
    })
  }
})