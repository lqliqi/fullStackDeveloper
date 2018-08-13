// pages/combo_confirm/combo_confirm.js
var app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    combo: {},
    good_detail: {},
    message: '',
    shop_name: '',
    charges: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '确认订单',
    })

    this.data.charges = options.charges
    this.data.shop_name = options.shop_name

    this.setData({
      combo: JSON.parse(options.combo),
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getAddress(this)
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
   * 获取地址
   */
  getAddress: function (that) {
    network.httpGet(app.globalData.member_address_obtain,
      {
        user_id: app.globalData.user_id
      },
      function success(res) {
        that.setData({
          address: res.data
        })
      })
  },
  /**
   * 买家留言
   */
  messageInput: function (e) {
    this.data.message = e.detail.value
  },
  /**
   * 生成订单
   */
  createOrder: function () {
    var that = this
    if (this.data.address == null) {
      wx.showToast({ title: '请填写收货地址', icon: 'none', duration: 1000, mask: true })
      return
    }

    var list = []

    for (var i = 0; i < that.data.combo.data.length; i++) {

      var good = {
        charges: '0.00',
        title: that.data.combo.data[i].title,
        price: that.data.combo.data[i].price,
        goods_id: that.data.combo.data[i].id,
        thumb_img: that.data.combo.data[i].thumb_img,
        rebate_percentage: that.data.combo.data[i].rebate_percentage,
        attr: that.data.combo.data[i].attr,
        number: 1,
        limited_status: '0'
      }
      list.push(good)
    }

    var shop_good = {
      red_packet_id: '',
      message: that.data.message,
      title: that.data.shop_name,
      charges: that.data.charges,
      price: that.data.combo.combo.combo_price,
      shop_id: that.data.combo.shop.shop_id,
      red_packet_price: '0.00',
      coupon_id: '',
      coupon_price: '0.00',
      freight: '0.00',
      list: list
    }

    var shop = []

    shop.push(shop_good)

    var goods_id = ''
    for (var i = 0; i < that.data.combo.data.length; i++) {
      goods_id += that.data.combo.data[i].id + ','
    }

    var key = {
      address: that.data.address,
      shop: shop,
      user_id: app.globalData.user_id,
      goods_id: goods_id
    }

    network.httpPost(app.globalData.member_order_generating_order,
      {
        Keys: key,
        user_id: app.globalData.user_id
      },
      function success(order_res) {
        var body = 'pay|' + app.globalData.user_id + '|' + that.data.good_id
        //预支付
        network.httpGet(app.globalData.prepayment,
          {
            shop_id: that.data.combo.shop.shop_id,
            body: body,
            // price: '0.01',
            price: that.data.combo.combo.combo_price,
            openid: app.globalData.openid,
            order_number: order_res.order_number
          },
          function success(res) {
            wx.requestPayment({
              timeStamp: res.timeStamp + '',
              nonceStr: res.nonceStr,
              package: 'prepay_id=' + res.package,
              signType: 'MD5',
              paySign: res.signX,
              success: function (res) {
                wx.redirectTo({
                  url: '../order_list/order_list',
                })
                wx.showToast({
                  title: '支付成功',
                  icon: 'success',
                  duration: 2000
                })
              },
              fail: function (res) {
                wx.redirectTo({
                  url: '../order_list/order_list',
                })
              }
            })
          })
      })

  }

})