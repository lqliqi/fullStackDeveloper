// pages/coupon_centre /coupon_centre .js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    left_list: [],
    currentNavtab: 0,
    //是否展开
    is_open: false,
    type_id: '',
    page: 1,
    coupon_list: [],
    scroll_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '领券中心',
    })
    wx.request({
      url: app.globalData.left_list,
      success: function (res) {
        that.setData({
          left_list: res.data.data,
          type_id: res.data.data[0].id
        })
        that.getData(that)
      }
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
    if (this.data.is_open) {
      this.setData({
        is_open: !this.data.is_open
      })
      return
    }
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx,
      type_id: e.currentTarget.dataset.item.id
    })
    this.getData(this)
  },

  clickItem: function (e) {
    console.log(e.currentTarget.dataset.item)
    this.data.page = 1
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx,
      scroll_id: 'a' + e.currentTarget.dataset.idx,
      is_open: false
    })
    this.data.type_id = e.currentTarget.dataset.item.id
    this.getData(this)
  },

  // clickItem: function (e) {
  //   this.data.page = 1
  //   this.setData({
  //     currentNavtab: e.currentTarget.dataset.idx,
  //     type_id: e.currentTarget.dataset.item.id,
  //     is_open: false
  //   })
  //   this.getData(this)
  // },
  /**
   * 是否展开
   */
  changeOpen: function () {
    this.setData({
      is_open: !this.data.is_open
    })
  },
  /**
   * 领取或使用优惠券
   */
  go_use: function (e) {
    var that = this
    var item = e.currentTarget.dataset.item
    if (item.receive_status == 1) {
      //去使用
      wx.switchTab({
        url: '../index/index',
      })
    } else {
      //领取
      var network = require("../../utils/network.js")
      network.httpGet(app.globalData.coupon_get,
        {
          coupon_id: item.id,
          user_id: app.globalData.user_id
        },
        function success(res) {
          for (var i = 0; i < that.data.coupon_list.length; i++) {
            if (item.id == that.data.coupon_list[i].id) {
              that.data.coupon_list[i].receive_status = 1
            }
          }
          that.setData({
            coupon_list: that.data.coupon_list
          })
          console.log(that.data.coupon_list)
          wx.showToast({ title: '领取成功', icon: 'succes', duration: 1000, mask: true })
        })
    }
  },
  /**
   * 获取数据
   */
  getData: function (that) {
    var network = require("../../utils/network.js")
    network.httpGet(app.globalData.home_coupon_list,
      {
        user_id: app.globalData.user_id,
        type_id: that.data.type_id,
        page: that.data.page
      },
      function success(res) {
        console.log(res.data.data)
        if (that.data.page == 1) {
          that.setData({
            coupon_list: res.data.data
          })
        } else {
          that.setData({
            coupon_list: that.data.coupon_list.concat(res.data.data)
          })
        }

      })
  }
})