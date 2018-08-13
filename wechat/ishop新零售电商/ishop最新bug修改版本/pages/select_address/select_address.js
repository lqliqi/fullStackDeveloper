// pages/select_address/select_address.js
var app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '选择收货地址',
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
   * 获取数据
   */
  getData: function (that) {
    network.httpGet(app.globalData.member_address_index,
      {
        user_id: app.globalData.user_id
      },
      function success(res) {
        that.setData({
          address_list: res.data.data
        })
        console.log(res)
      })
  },
  /**
   * 选择地址
   */
  select: function (e) {

    var pages = getCurrentPages()    //获取加载的页面( 页面栈 )
    var prevPage = pages[pages.length - 2]    //获取上一个页面
    // 设置上一个页面的数据（可以修改，也可以新增）
    prevPage.setData({
      address: e.currentTarget.dataset.item
    })
    wx.navigateBack({
      delta: 1
    })
  }
})