// pages/search_shop/search_shop.js
var app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    shop_list: [],
    title: '',
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '店铺列表',
    })
    this.setData({
      title: options.title
    })
    this.getShopListData(this)
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
    this.getShopListData(this)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.total != this.data.shop_list.length) {
      this.data.page++
      this.getShopListData(this)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 搜索的关键字
   */
  searchKey: function (e) {
    this.setData({
      title: e.detail.value
    })

  },
  /**
   * 搜索
   */
  search: function () {
    if (this.data.title == '') {
      wx.showToast({ title: '请输入搜索关键字', icon: 'none', duration: 1000, mask: true })
    } else {
      this.data.page = 1
      this.getShopListData(this)
    }
  },
  /**
   * 获取店铺列表
   */
  getShopListData: function (that) {
    network.httpGet(app.globalData.shop_shop_list,
      {
        title: that.data.title,
        page: that.data.page
      },
      function success(res) {
        console.log(res.data)
        that.setData({
          shop_list: res.data.data,
          total: res.data.total
        })
      })
  }
})