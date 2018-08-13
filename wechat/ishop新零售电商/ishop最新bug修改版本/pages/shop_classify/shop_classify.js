// pages/shop_classify/shop_classify.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop_id: '',
    classify:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '店铺分类',
    })
    this.setData({
      shop_id: options.shop_id
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
    wx.request({
      url: app.globalData.shop_classify,
      data: {
        user_id: that.data.shop_id
      },
      success:function(res){
        console.log(res.data)
        that.setData({
          classify:res.data.data
        })
      }
    })
  }
})