// pages/hot_sale_classify/hot_sale_classify.js
var app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //展开栏
    is_open: false,
    //分类列表
    type_list: [],
    //二级分类列表
    second_tablist: [],
    //分类索引
    currentNavtab: 0,
    //二级分类索引
    currentSecondTab: -1,
    parenTid: '',
    goods_list: [],
    scroll_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '热卖榜',
    })
    this.data.parenTid = options.id

    this.getTypeList(this)

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
    if (this.data.is_open) {
      this.setData({
        is_open: !this.data.is_open
      })
      return
    }
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx,
      type_id: e.currentTarget.dataset.item.id,
      second_tablist: this.data.type_list[e.currentTarget.dataset.idx].classify,
      currentSecondTab: -1,
      parenTid: this.data.type_list[e.currentTarget.dataset.idx].id
    })
    this.getGoodList(this)
  },
  /**
   * 切换二级选项卡
   */
  switchSecond: function (e) {
    this.setData({
      currentSecondTab: e.currentTarget.dataset.idx
    });
    this.data.parenTid = e.currentTarget.dataset.id
    this.getGoodList(this)
  },
  /**
   * 点击下拉出的列表
   */
  clickItem: function (e) {
    this.setData({
      scroll_id: 'a' + e.currentTarget.dataset.idx,
      currentNavtab: e.currentTarget.dataset.idx,
      type_id: e.currentTarget.dataset.item.id,
      second_tablist: this.data.type_list[e.currentTarget.dataset.idx].classify,
      is_open: false
    })
    this.data.parenTid = e.currentTarget.dataset.item.id
    this.getGoodList(this)
  },
  /**
   * 是否展开
   */
  changeOpen: function () {
    this.setData({
      is_open: !this.data.is_open
    })
  },
  /**
   * 获取标题
   */
  getTypeList: function (that) {

    network.httpGet(app.globalData.hot_sale_type_list, '', function success(res) {
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].id == that.data.parenTid) {
          that.data.currentNavtab = i
        }
      }
      that.setData({
        type_list: res.data,
        second_tablist: res.data[that.data.currentNavtab].classify,
        currentNavtab: that.data.currentNavtab,
        scroll_id: 'a' + that.data.currentNavtab
      })
      that.getGoodList(that)
    })
  },
  /**
   * 获取商品列表
   */
  getGoodList: function (that) {
    network.httpGet(app.globalData.hot_sale_goods_list,
      {
        parenTid: that.data.parenTid
      },
      function success(res) {
        that.setData({
          goods_list: res.data
        })
      })
  }
})