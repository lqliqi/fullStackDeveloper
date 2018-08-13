// pages/hot_market_detail/hot_market_detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    currentNavtab: -1,
    currentSecondTab: -1,
    page: 1,
    detail: {},
    //商品列表
    goods_data: [],
    //一级列表
    tablist: [],
    //二级列表
    secondTabList: [],
    isFirst: true,
    secondHidden: true,
    id: 48,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title,
    })
    this.data.id = options.id
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
    this.setData({
      detail: {},
      goods_data: []
    })
    this.getData(this)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.page++;
    this.getData(this)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 网络请求
   */
  getData: function (that) {
    that.changeHidden()
    wx.request({
      url: app.globalData.hot_market_list,
      data: {
        id: that.data.id,
        page: that.data.page
      },
      success: function (res) {
        that.changeHidden()
        wx.stopPullDownRefresh()
        if (that.data.isFirst) {
          that.data.isFirst = false;
          that.setData({
            tablist: res.data.data
          })
        }
        if (that.data.page == 1) {
          if (res.data.data.length != 0) {
            that.setData({
              detail: res.data,
              goods_data: res.data.goods_list.data,
            })
          } else {
            that.setData({
              goods_data: res.data.goods_list.data,
            })
          }
        } else {
          that.setData({
            goods_data: that.data.goods_data.concat(res.data.goods_list.data)
          })
        }
      }
    })

  },

  /**
   * 点击banner
   */
  clickBanner: function (e) {
    var item = e.currentTarget.dataset.item
    if (item.skip_type == 'goods') {
      wx.navigateTo({
        url: '../good_detail/good_detail?id=' + item.linkUrl,
      })
    } else if (item.skip_type == 'shop') {
      wx.navigateTo({
        url: '../shop_details/shop_details?shop_id=' + item.linkUrl,
      })
    } else {
      wx.navigateTo({
        url: '../detail_web/detail_web?id=' + item.linkUrl,
      })
    }
  },
  /**
   * 切换选项卡
   */
  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx,
      secondHidden: false,
      currentSecondTab: -1,
    });
    this.data.id = e.currentTarget.dataset.id
    this.data.page = 1
    this.getData(this)
  },
  /**
   * 切换选项卡
   */
  switchSecond: function (e) {
    this.setData({
      currentSecondTab: e.currentTarget.dataset.idx
    });
    this.data.id = e.currentTarget.dataset.id
    this.data.page = 1
    this.getData(this)
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