// pages/redpocket/redpocket.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab: ['未使用', '已使用', '已过期'],
    currentNavtab: 0,
    hidden: true,
    //请求参数
    status: 0,
    time: 0,
    page: 1,
    red_list: [],
    is_open: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '红包',
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
   * 加载框的显示
   */
  changeHidden: function () {
    this.setData({
      hidden: !this.data.hidden
    });
  },
  /**
   * 切换选项卡
   */
  switchTab: function (e) {
    this.data.status = 0
    this.data.time = 0
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    })
    if (e.currentTarget.dataset.idx == 0) {

    } else if (e.currentTarget.dataset.idx == 1) {
      this.data.status = 1
    } else {
      this.data.time = 1
    }
    this.getData(this)
  },
  /**
   * 获取数据
   */
  getData: function (that) {
    that.changeHidden()
    wx.request({
      url: app.globalData.my_pocket,
      data: {
        user_id: app.globalData.user_id,
        status: that.data.status,
        time: that.data.time,
        page: that.data.page
      },
      success: function (res) {
        that.changeHidden()
        wx.stopPullDownRefresh()
        console.log(res.data)
        if (that.data.page == 1) {
          that.setData({
            red_list: res.data.data.data
          })
        } else {
          that.setData({
            red_list: that.data.red_list.concat(res.data.data.data)
          })
        }

        //是否展开
        that.data.is_open = []
        for (var i = 0; i < that.data.red_list.length; i++) {
          that.data.is_open.push(false)
        }
        that.setData({
          is_open: that.data.is_open
        })
      }
    })
  },
  /**
   * 展开标签
   */
  opentip: function (e) {
    var that = this
    this.data.is_open[e.currentTarget.dataset.index] = !this.data.is_open[e.currentTarget.dataset.index]
    this.setData({
      is_open: that.data.is_open
    })
  },
  /**
   * 立即使用
   */
  go_use: function () {
    wx.switchTab({
      url: '../index/index',
    })
  }
})