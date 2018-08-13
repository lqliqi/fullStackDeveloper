// pages/hotspot/hotspot.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    hot_spot: [],
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '热点',
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
   *  上拉加载
   */
  onReachBottom: function () {
    this.data.page++;
    this.getData(this)
    console.log('as')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.page = 1;
    this.setData({
      hot_spot: []
    })
    this.getData(this)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 网络加载
   */
  getData:function(that){
    that.changeHidden();
    wx.request({
      url: app.globalData.hot_spot,
      data: {
        page: that.data.page
      },
      success: function (res) {
        that.changeHidden();
        wx.stopPullDownRefresh();
        if (that.data.page == 1){
          that.setData({
            hot_spot: res.data.data.data
          })
        }else{
          that.setData({
            hot_spot: that.data.hot_spot.concat(res.data.data.data)
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