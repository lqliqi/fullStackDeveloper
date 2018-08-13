// pages/manage_address/manage_address.js
var app = getApp()
var network = require("../../utils/network.js")
var event = require('../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    address: [],
    total: 0,
    //管理收货地址 false  选择收货地址true
    isManage:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '管理收货地址',
    })
    if(options.isManage != null){
      this.data.isManage = true
    }
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
    this.onPullDownRefresh()
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
    if (this.data.total != this.data.address.length) {
      this.data.page++
      this.getData(this)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 获取数据
   */
  getData: function (that) {
    network.httpGet(app.globalData.member_address,
      {
        page: that.data.page,
        user_id: app.globalData.user_id
      },
      function success(res) {
        if (that.data.page == 1) {
          that.setData({
            total: res.data.total,
            address: res.data.data
          })
        } else {
          that.setData({
            address: that.data.address.concat(res.data.data)
          })
        }
      })

  },
  /**
   * 设为默认
   */
  default: function (e) {
    var that = this
    var item = e.currentTarget.dataset.item
    network.httpGet(app.globalData.member_address_default,
      {
        id: item.id
      },
      function success(res) {
        wx.showToast({ title: '设置默认地址成功', icon: 'none', duration: 1000, mask: true })
        for (var i = 0; i < that.data.address.length; i++) {
          if (that.data.address[i].id == item.id) {
            that.data.address[i].status = 1
          } else {
            that.data.address[i].status = 2
          }
        }
        that.setData({
          address: that.data.address
        })
      })
  },
  /**
   * 编辑地址
   */
  editAddress: function (e) {
    var item = e.currentTarget.dataset.item

  },
  /**
   * 删除地址
   */
  deleteAddress: function (e) {
    var item = e.currentTarget.dataset.item
    var that = this
    wx.showModal({
      title: '确定要删除该地址吗?',
      content: '',
      confirmColor: '#e73c0a',
      success: function (res) {
        if (res.confirm) {
          network.httpGet(app.globalData.member_address_destroy,
            {
              id: item.id
            },
            function success(res) {
              that.data.page = 1
              that.getData(that)
              wx.showToast({ title: '删除成功', icon: 'none', duration: 1000, mask: true })
            })
        }
      }
    })
  },
  /**
   * 添加收货地址
   */
  add_address: function () {
    wx.navigateTo({
      url: '../edit_address/edit_address',
    })
  },
  /**
   * 编辑收货地址
   */
  edit_address: function (e) {
    var item = e.currentTarget.dataset.item
    let str = JSON.stringify(e.currentTarget.dataset.item);
    wx.navigateTo({
      url: '../edit_address/edit_address?item=' + str,
    })
  },
  /**
   * 选择地址
   */
  select: function (e) {
    if (!this.data.isManage){
      event.emit('changeAddress', e.currentTarget.dataset.item.id);
      console.log(e.currentTarget.dataset.item)
      var pages = getCurrentPages()    //获取加载的页面( 页面栈 )
      var prevPage = pages[pages.length - 2]    //获取上一个页面
      // 设置上一个页面的数据（可以修改，也可以新增）
      prevPage.setData({
        address: e.currentTarget.dataset.item
      })
      wx.navigateBack({
        delta: 1
      })
    }
  }
})