// pages/commission_detail/commission_detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab: ["收入", "支出"],
    currentNavtab: "0",
    hidden: true,
    page: 1,
    type: 1,
    detail: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '佣金明细',
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
    this.data.page = 1
    this.getData(this)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.page++
    this.getData(this)
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
      this.setData({
        type: 1
      })
    } else {
      this.setData({
        type: 2
      })
    }
    this.getData(this)
  },
  /**
   * 获取数据
   */
  getData: function (that) {
    that.changeHidden()
    wx.request({
      url: app.globalData.commission_detail,
      data: {
        user_id: app.globalData.user_id,
        type: that.data.type,
        page: that.data.page
      },
      success: function (res) {
        that.changeHidden()
        wx.stopPullDownRefresh()
        if (that.data.page == 1) {
          that.setData({
            detail: res.data.data.data
          })
        } else {
          that.setData({
            detail: that.data.detail.concat(res.data.data.data)
          })
        }
      }
    })

  },
  /**
   * 加载框的显示
   */
  changeHidden: function () {
    this.setData({
      hidden: !this.data.hidden
    });
  }
})