// pages/confirm_order/confirm_order.js
var app = getApp()
var network = require("../../utils/network.js")
var event = require('../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否是限时抢购或天天特价
    usable: false,
    //地址
    address: {},
    //店铺id
    shop_id: '',
    //店铺名称
    shop_title: '',
    //商品id
    good_id: '',
    //商品图片
    good_picUrl: '',
    //商品名称
    good_title: '',
    //商品规格
    size: '',
    //商品价格
    price: '',
    //商品数量
    num: '',
    //买家留言
    message: '',
    //返利
    charges: '',
    rebate_percentage: '',
    //运费
    freight_price: 0,
    //优惠
    coupon_price: 0,
    coupon_id: '',
    //红包
    red_price: 0,
    red_pocket_id: '',
    //原价金额
    original_price: '',
    //合计金额
    total: '',
    coupon: '使用优惠券',
    red_pocket: '使用红包',
    //天天特价 限时抢购1 正常商品0
    limited_status: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.data.limited_status = options.limited_status
    //改变地址
    event.on('changeAddress', this, function (freight_id) {
      that.getFreightPrice(that, freight_id)
    })
    //改变优惠券
    event.on('changeCoupon', this, function (item) {
      var coupon = JSON.parse(item)
      that.setData({
        coupon_price: coupon.actual_price,
        coupon_id: coupon.id,
        coupon: '优惠' + coupon.actual_price + '元'
      })
      this.calculate()
    })
    //改变红包
    event.on('changeRedpocket', this, function (item) {
      var redpocket = JSON.parse(item)
      that.setData({
        red_price: redpocket.actual_price,
        red_pocket_id: redpocket.id,
        red_pocket: '优惠' + redpocket.actual_price + '元'
      })
      this.calculate()
    })
    wx.setNavigationBarTitle({
      title: '确认订单',
    })

    this.setData({
      //地址模板
      address: JSON.parse(options.address),
      shop_id: options.shop_id,
      shop_title: options.shop_title,
      good_title: options.good_title,
      size: options.size,
      price: options.price,
      num: options.num,
      freight_price: options.freight_price,
      good_picUrl: options.good_picUrl,
      charges: options.charges,
      rebate_percentage: options.rebate_percentage,
      good_id: options.good_id
    })
    if (options.usable == 'false') {
      this.data.usable = false
    } else {
      this.data.usable = true
    }
    if (!this.data.usable) {
      this.setData({
        coupon: '不可用',
        red_pocket: '不可用'
      })
    }
    this.calculate()
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
    event.remove('changeAddress', this);
    event.remove('changeCoupon', this);
    event.remove('changeRedpocket', this);
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
   * 更改地址运费
   */
  getFreightPrice: function (that, freight_id) {
    network.httpGet(app.globalData.changefright,
      {
        shop_id: that.data.shop_id,
        freight_id: freight_id
      },
      function success(res) {
        that.setData({
          freight_price: res.freight.price
        })
        that.calculate()
      })
  },
  /**
   * 买家留言
   */
  message: function (e) {
    this.data.message = e.detail.value
  },
  /**
   * 跳转到优惠券
   */
  use_coupon: function () {
    if (this.data.usable) {
      wx.navigateTo({
        url: '../use_coupon/use_coupon?shop_id=' + this.data.shop_id + '&total=' + this.data.original_price,
      })
    }

  },
  /**
   * 跳转到红包
   */
  use_redpocket: function () {
    if (this.data.usable) {
      wx.navigateTo({
        url: '../use_pocket/use_pocket?&total=' + this.data.original_price,
      })
    }
  },
  /**
   * 计算总价
   */
  calculate: function () {
    this.data.original_price = parseFloat(this.data.num * this.data.price) + parseFloat(this.data.freight_price)
    this.data.total = parseFloat(this.data.num * this.data.price) + parseFloat(this.data.freight_price) - parseFloat(this.data.coupon_price) - parseFloat(this.data.red_price)
    this.setData({
      total: this.data.total.toFixed(2)
    })
  },

  /**
   * 生成订单
   */
  createOrder: function () {
    var that = this
    if (!that.data.address.name) {
      wx.showToast({ title: '请选择收货地址', icon: 'none', duration: 1000, mask: true })
      return
    }

    network.httpGet(app.globalData.member_my_list,
      {
        user_id: app.globalData.user_id
      },
      function success(res) {
        console.log(res)
        // //未设置支付密码
        // if (res.data.pay_pass != '1') {
        //   wx.navigateTo({
        //     url: '../set_password/set_password',
        //   })
        //   wx.showToast({ title: '请先设置支付密码', icon: 'none', duration: 1000, mask: true })
        //   return
        // } else {
        //生成订单

        var shop = []
        var good_list = []
        var good = {
          charges: that.data.charges,
          title: that.data.good_title,
          price: that.data.price,
          goods_id: that.data.good_id,
          thumb_img: that.data.good_picUrl,
          rebate_percentage: that.data.rebate_percentage,
          attr: that.data.size,
          number: that.data.num,
          limited_status: that.data.limited_status
        }

        good_list.push(good)

        var shop_good = {
          red_packet_id: that.data.red_pocket_id,
          title: that.data.shop_title,
          charges: that.data.charges,
          price: that.data.total,
          shop_id: that.data.shop_id,
          red_packet_price: that.data.red_price,
          coupon_id: that.data.coupon_id,
          freight: that.data.freight_price,
          coupon_price: that.data.coupon_price,
          list: good_list,
          message: that.data.message
        }

        shop.push(shop_good)
        var key = {
          address: that.data.address,
          shop: shop,
          user_id: app.globalData.user_id,
          goods_id: that.data.good_id
        }
        console.log(key)
        //生成订单
        network.httpGet(app.globalData.member_order_generating_order,
          {
            Keys: key,
            user_id: app.globalData.user_id
          },
          function success(order_res) {
            console.log(order_res)
            var body = 'pay|' + app.globalData.user_id + '|' + that.data.good_id
            //预支付
            network.httpGet(app.globalData.prepayment,
              {
                shop_id: that.data.shop_id,
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
                    wx.redirectTo({
                      url: '../order_list/order_list',
                    })
                    wx.showToast({
                      title: '支付成功',
                      icon: 'success',
                      duration: 2000
                    })

                    // network.httpPost(app.globalData.pay_finish,
                    //   {
                    //     xml: '<xml> <attach>' + body + '</attach>' + '<out_trade_no>' + order_res.order_number + '</out_trade_no>' + '<total_fee>' + that.data.total + '</total_fee> </xml>'
                    //     // attach: body,
                    //     // out_trade_no: order_res.order_number,
                    //     // total_fee: that.data.total
                    //   },
                    //   function success(res) {
                    //     wx.redirectTo({
                    //       url: '../order_list/order_list',
                    //     })
                    //   })
                  },
                  fail: function (res) {
                    wx.redirectTo({
                      url: '../order_list/order_list',
                    })
                  }
                })
              })
          })
        // }
      })

  }
})