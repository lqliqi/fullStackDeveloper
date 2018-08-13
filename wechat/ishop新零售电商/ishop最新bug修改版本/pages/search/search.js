// pages/search/search.js
var app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //选择搜索类型
    search_type: '宝贝',
    //类型选择
    is_type: false,
    //热门搜索
    hot_list: [],
    //历史搜索
    history_list: [],
    //搜索关键字
    key: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '搜索',
    })
    this.getHotData(this)
    console.log(this.data.history_list)
    this.setData({
      history_list: wx.getStorageSync('history').length == 0 ? [] : wx.getStorageSync('history')
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
   * 热门搜索
   */
  getHotData: function (that) {
    network.httpGet(app.globalData.search_hot, '',
      function success(res) {
        that.setData({
          hot_list: res.data
        })
      })
  },
  /**
   * 选择类型
   */
  chooseType: function () {
    this.setData({
      is_type: !this.data.is_type
    })
  },
  /**
   * 选择宝贝
   */
  chooseGood: function () {
    this.setData({
      search_type: '宝贝',
      is_type: false
    })
  },
  /**
   * 选择店铺
   */
  chooseShop: function () {
    this.setData({
      search_type: '店铺',
      is_type: false
    })
  },
  /**
   * 搜索关键字
   */
  searchKey: function (e) {
    this.data.key = e.detail.value
  },
  /**
   * 搜索
   */
  search: function (e) {
    if (e.currentTarget.dataset.item != null) {
      this.data.key = e.currentTarget.dataset.item
    } else {
      if (this.data.key == '') {
        wx.showToast({ title: '请输入搜索关键字', icon: 'none', duration: 1000, mask: true })
        return
      }
    }

    for (var i = 0; i < this.data.history_list.length; i++) {
      if (this.data.key == this.data.history_list[i]) {
        this.data.history_list.splice(i, 1)
      }
    }
    this.data.history_list.splice(0, 0, this.data.key)
    wx.setStorageSync('history', this.data.history_list)
    this.setData({
      history_list: this.data.history_list
    })
    if (this.data.search_type == '宝贝') {
      wx.navigateTo({
        url: '../cotegory/cotegory?title=' + this.data.key,
      })
    } else {
      wx.navigateTo({
        url: '../search_shop/search_shop?title=' + this.data.key,
      })
    }

  },
  /**
   * 清空搜索历史
   */
  clearHistory: function () {
    wx.clearStorageSync()
    this.setData({
      history_list: []
    })
  }
})