var app = getApp()
var network = require("../../utils/network.js")
var event = require('../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //地址
    address: '',
    address_id: '',
    //购买的购物车id
    cart_id: '',
    //购买商品id
    goods_id: '',
    //显示列表
    cart_good_list: [],
    //拼接json列表
    goods_info_list: [],
    //当前点击的条目索引
    index: '',
    //合计
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: '确认订单',
    })
    this.data.cart_id = options.cart_id
    this.data.goods_id = options.goods_id
    this.getCartGoods(this)
    //改变地址
    event.on('changeAddress', this, function (freight_id) {
      that.data.address_id = freight_id
      that.getCartGoods(that)
    })
    //改变优惠券
    event.on('changeCoupon', this, function (item) {
      var coupon = JSON.parse(item)
      that.data.goods_info_list[this.data.index].coupon_id = coupon.id
      that.data.goods_info_list[this.data.index].coupon_price = coupon.actual_price
      that.data.goods_info_list[this.data.index].coupon = '优惠' + coupon.actual_price + '元'
      that.setData({
        goods_info_list: that.data.goods_info_list
      })
      this.calculate(that)
    })
    try {
      event.on('changeRedpocket', this, function (item) {
        var redpocket = JSON.parse(item)
        that.data.goods_info_list[this.data.index].red_packet_id = redpocket.id
        that.data.goods_info_list[this.data.index].red_packet_price = redpocket.actual_price
        that.data.goods_info_list[this.data.index].red_pocket = '优惠' + redpocket.actual_price + '元'
        that.setData({
          goods_info_list: that.data.goods_info_list
        })
        this.calculate(that)
      })
    } catch (e) { }
    //改变红包

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
   * 商品列表
   */
  getCartGoods: function (that) {
    network.httpGet(app.globalData.member_order_affirm,
      {
        address_id: that.data.address_id,
        cart_id: that.data.cart_id,
        goods_id: that.data.goods_id,
        user_id: app.globalData.user_id
      },
      function success(res) {
        console.log(res)
        that.setData({
          address: res.address,
          cart_good_list: res.data
        })
        that.data.total = 0
        for (var i = 0; i < that.data.cart_good_list.length; i++) {
          //商品数量
          var num = 0
          //商品价格
          var total = 0
          for (var j = 0; j < that.data.cart_good_list[i].list.length; j++) {
            num += that.data.cart_good_list[i].list[j].number
            total += parseFloat(that.data.cart_good_list[i].list[j].number * that.data.cart_good_list[i].list[j].price)
          }
          total += parseFloat(that.data.cart_good_list[i].shop_freight)
          var shop_good = {
            shop_id: that.data.cart_good_list[i].shop_id,
            red_packet_id: '',
            red_pocket: '使用红包',
            red_packet_price: 0,
            coupon_id: '',
            coupon: '使用优惠券',
            coupon_price: 0,
            num: num,
            message: '',
            total: total.toFixed(2)
          }
          that.data.total += parseFloat(total)
          that.data.goods_info_list.push(shop_good)
        }
        that.setData({
          total: (that.data.total).toFixed(2),
          goods_info_list: that.data.goods_info_list
        })
      })
  },
  /**
   * 使用优惠券
   */
  use_coupon: function (e) {
    var index = e.currentTarget.dataset.index
    this.data.index = index
    var goods_info = this.data.goods_info_list[index]
    console.log(goods_info.total)
    wx.navigateTo({
      url: '../use_coupon/use_coupon?shop_id=' + goods_info.shop_id + '&total=' + goods_info.total,
    })
  },
  /**
   * 使用红包
   */
  use_redpocket: function (e) {
    var index = e.currentTarget.dataset.index
    this.data.index = index
    var goods_info = this.data.goods_info_list[index]
    console.log(goods_info.total)
    wx.navigateTo({
      url: '../use_pocket/use_pocket?total=' + goods_info.total,
    })
  },
  /**
   * 计算价格
   */
  calculate: function (that) {
    that.data.total = 0
    for (var i = 0; i < that.data.cart_good_list.length; i++) {
      //商品数量
      var num = 0
      //商品价格
      var total = 0
      for (var j = 0; j < that.data.cart_good_list[i].list.length; j++) {
        num += that.data.cart_good_list[i].list[j].number
        total += parseFloat(that.data.cart_good_list[i].list[j].number * that.data.cart_good_list[i].list[j].price)
        that.data.goods_info_list[i].total = (parseFloat(that.data.cart_good_list[i].list[j].number * that.data.cart_good_list[i].list[j].price) + parseFloat(that.data.cart_good_list[i].shop_freight) - that.data.goods_info_list[i].red_packet_price - that.data.goods_info_list[i].coupon_price).toFixed(2)
      }
      total += parseFloat(that.data.cart_good_list[i].shop_freight) - that.data.goods_info_list[i].red_packet_price - that.data.goods_info_list[i].coupon_price

      that.data.total += parseFloat(total)
    }
    that.setData({
      total: (that.data.total).toFixed(2),
      goods_info_list: that.data.goods_info_list
    })
  },
  /**
   *  买家留言
   */
  BBSInput: function (e) {
    var index = e.currentTarget.dataset.index
    this.data.goods_info_list[index].message = e.detail.value
  },
  /**
   * 生成订单
   */
  createOrder: function () {
    var that = this
    if (this.data.address.name == '') {
      wx.showToast({ title: '请选择收货地址', icon: 'none', duration: 1000, mask: true })
      return
    }
    //地址
    var address = this.data.address

    var shop = []

    for (var i = 0; i < this.data.cart_good_list.length; i++) {
      console.log(this.data.cart_good_list[i])
      var good_shop = {
        red_packet_id: this.data.goods_info_list[i].red_packet_id,
        message: this.data.goods_info_list[i].message,
        title: this.data.cart_good_list[i].title,
        charges: this.data.cart_good_list[i].charges,
        price: this.data.goods_info_list[i].total,
        shop_id: this.data.cart_good_list[i].shop_id,
        red_packet_price: this.data.goods_info_list[i].red_packet_price,
        coupon_id: this.data.goods_info_list[i].coupon_id,
        coupon_price: this.data.goods_info_list[i].coupon_price,
        freight: this.data.cart_good_list[i].shop_freight,
        list: this.data.cart_good_list[i].list
      }
      shop.push(good_shop)
    }

    var key = {
      address: address,
      shop: shop,
      user_id: app.globalData.user_id,
      goods_id: this.data.goods_id
    }

    console.log(key)

    network.httpPost(app.globalData.member_order_generating_order,
      {
        Keys: key,
        user_id: app.globalData.user_id
      },
      function success(order_res) {
        console.log(order_res)
        var body = 'pay|' + app.globalData.user_id + '|' + that.data.goods_id
        //预支付
        network.httpGet(app.globalData.prepayment,
          {
            // shop_id: that.data.combo.shop.shop_id,
            body: body,
            // price: '0.01',
            price: that.data.total,
            openid: app.globalData.openid,
            order_number: order_res.order_number
          },
          function success(res) {
            console.log(res)
            wx.requestPayment({
              timeStamp: res.timeStamp + '',
              nonceStr: res.nonceStr,
              package: 'prepay_id=' + res.package,
              signType: 'MD5',
              paySign: res.signX,
              success: function (res) {
                console.log(res)
                event.emit('refresh_cart')
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
                event.emit('refresh_cart')
                wx.redirectTo({
                  url: '../order_list/order_list',
                })
              }
            })
          })
      })

  }
})