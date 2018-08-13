// pages/shop_intro/shop_intro.js
var app = getApp()
var network = require("../../utils/network.js")
var event = require('../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop_data: {},
    zy: true,
    shop_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '店铺简介',
    })
    this.setData({
      shop_id: options.shop_id
    })
    this.getShopData(this)
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
   * 获取店铺信息
   */
  getShopData: function (that) {
    //店铺信息
    network.httpGet(app.globalData.shop_detail,
      {
        shop_id: that.data.shop_id,
        user_id: app.globalData.user_id
      },
      function success(res) {
        that.setData({
          shop_data: res
        })
        //是否是自营
        if (res.data.type == 1) {
          that.setData({
            zy: false
          })
        }
      })

  },
  /**
   * 收藏店铺
   */
  collect: function () {
    var that = this
    //未收藏
    if (that.data.shop_data.collect_state == '') {

      network.httpPost(app.globalData.collect_create,
        {
          id: that.data.shop_id,
          type_id: 2,
          user_id: app.globalData.user_id

        },
        function success(res) {
          that.getShopData(that)
          wx.showToast({ title: '收藏成功', icon: 'succes', duration: 1000, mask: true })
          event.emit('changeCollect',true)
        })

    } else {
      network.httpGet(app.globalData.collect_del,
        {
          id: that.data.shop_id,
          user_id: app.globalData.user_id
        },
        function success(res) {
          that.getShopData(that)
          wx.showToast({ title: '取消收藏成功', icon: 'succes', duration: 1000, mask: true })
          event.emit('changeCollect', false)
        })
    }
  },
})