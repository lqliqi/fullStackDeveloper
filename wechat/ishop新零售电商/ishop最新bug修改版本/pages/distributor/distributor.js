// pages/distributor/distributor.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab: ["一级(0)", "二级(0)"],
    currentNavtab: "0",
    //请求参数
    level: 1,
    page: 1,
    info: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '分销商',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getData(this)
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
    this.getData(this)
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
   * 切换选项卡
   */
  switchTab: function (e) {
    this.data.page = 1
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
    if (e.currentTarget.dataset.idx == 0) {
      this.data.level = 1
    } else {
      this.data.level = 2
    }
    this.getData(this)
  },

  /**
   * 获取数据
   */
  getData: function (that) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.my_distribution_list,
      data: {
        level: that.data.level,
        page: that.data.page,
        user_id: app.globalData.user_id
      },
      success: function (res) {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        console.log(res.data)
        if (that.data.page == 1) {
          that.setData({
            navTab: ["一级(" + res.data.level.one_level + ")",
            "二级(" + res.data.level.two_level + ")"],
            info: res.data.data.data
          })
        } else {
          that.setData({
            navTab: ["一级(" + res.data.level.one_level + ")",
            "二级(" + res.data.level.two_level + ")"],
            info: that.data.concat(res.data.data.data)
          })
        }

      }
    })
  }
})