// pages/brands/brands.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classify_tab: [{ id: "A,B,C,D,E", title: "A-E" },
    { id: "F,G,H,I,J", title: "F-J" },
    { id: "K,L,M,N,O", title: "K-O" },
    { id: "P,Q,R,S,T", title: "P-T" },
    { id: "U,V,W,X,Y,Z", title: "U-Z" }],
    currentNavtab: 0,
    page: 1,
    grand_list: {},
    hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '品牌街',
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
    this.data.page = 1;
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
    this.data.page = 1;
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
    this.getData(this)
  },
  /**
   * 获取数据
   */
  getData: function (that) {
    that.changeHidden();
    wx.request({
      url: app.globalData.brand_list,
      data: {
        letter: that.data.classify_tab[that.data.currentNavtab].id,
        page: that.data.page
      },
      success: function (res) {
        that.changeHidden();
        wx.stopPullDownRefresh();
        if (that.data.page == 1) {
          that.setData({
            grand_list: res.data.data.data
          })
        } else {
          that.setData({
            grand_list: that.data.grand_list.concat(res.data.data.data)
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