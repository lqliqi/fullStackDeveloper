// pages/classify/classify.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentNavtab: 0,
    classify: [],
    data: [],
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '分类',
    })
    that.changeHidden();
    wx.request({
      url: app.globalData.left_list,
      success: function (res) {
        var c = [];
        c.push({
          id: 0,
          title: "推荐分类"
        })
        for (var i = 0; i < res.data.data.length; i++) {
          c.push(res.data.data[i]);
        }
        that.setData({
          classify: c,
        })
        // that.changeHidden();
      }
    })
    this.changeLeft(that);
  },
  /**
   * 加载框
   */
  changeHidden: function () {
    this.setData({
      loading: !this.data.loading
    });
  },
  /**
   * 点击选项卡
   */
  changeLeft: function (that) {
    that.changeHidden();
    if (this.data.currentNavtab != 0) {
      wx.request({
        url: app.globalData.right_list,
        data: {
          id: this.data.classify[this.data.currentNavtab].id
        },
        success: function (res) {
          that.setData({
            data: res.data.data
          })
          that.changeHidden();
        }
      })
    } else {
      wx.request({
        url: app.globalData.recommend_list,
        success: function (res) {
          var array = [];
          for (var i = 0; i < res.data.data.length; i++) {
            array.push(res.data.data[i]);
          }
          that.setData({
            data: [{
              title: '推荐分类',
              classify: array
            }]
          })
          that.changeHidden();
        }
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
   * 切换选项卡
   */
  switchTab: function (e) {
    this.data.currentNavtab = e.currentTarget.dataset.idx;
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
    this.changeLeft(this);
  }
})