// pages/order_list/order_list.js
var app = getApp()
var network = require("../../utils/network.js")
var event = require('../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    navTab: ["全部", "待付款", "待收货", "待评价", "退换货"],
    currentNavtab: "0",
    status: '',
    page: 1,
    order_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的订单',
    })

    //退货填写物流改变状态
    event.on('changeStatus', this, function (index) {
      this.data.order_list[index].status = 9
      this.setData({
        order_list: this.data.order_list
      })
    })

    //从列表中移除item
    event.on('remove', this, function (index) {
      this.data.order_list.splice(index, 1)
      this.setData({
        order_list: this.data.order_list
      })
    })

    //刷新列表
    event.on('refresh', this, function () {
      this.onPullDownRefresh()
    })

    this.setData({
      currentNavtab: options.index
    })
    switch (options.index) {
      case '0':
        this.setData({
          status: 'all'
        })
        break;
      case '1':
        this.setData({
          status: '0'
        })
        break;
      case '2':
        this.setData({
          status: '1,2'
        })
        break;
      case '3':
        this.setData({
          status: '3'
        })
        break;
      case '4':
        this.setData({
          status: '6,7,8,9,10,11'
        })
        break;
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
    event.remove('remove', this)
    event.remove('changeStatus', this)
    event.remove('refresh', this)
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
    this.data.page = 1
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
    switch (this.data.currentNavtab) {
      case 0:
        this.data.status = 'all'
        break;
      case 1:
        this.data.status = '0'
        break;
      case 2:
        this.data.status = '1,2'
        break;
      case 3:
        this.data.status = '3'
        break;
      case 4:
        this.data.status = '6,7,8,9,10,11'
        break;
    }
    this.setData({
      status: this.data.status
    })
    this.getData(this)
  },

  /**
   * 获取数据
   */
  getData: function (that) {
    that.changeHidden(that)
    wx.request({
      url: app.globalData.member_order,
      data: {
        user_id: app.globalData.user_id,
        status: that.data.status,
        page: that.data.page
      },
      success: function (res) {
        wx.stopPullDownRefresh()
        that.changeHidden(that)
        console.log(res)
        if (that.data.page == 1) {
          that.setData({
            order_list: res.data.data.data
          })
        } else {
          that.setData({
            order_list: that.data.order_list.concat(res.data.data.data)
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
  },
  /**
   * 付款
   */
  pay_order: function (e) {
    var that = this
    var item = e.currentTarget.dataset.item
    console.log(item)
    var body = 'pay|' + app.globalData.user_id + '|' + item.id
    //预支付
    network.httpGet(app.globalData.prepayment,
      {
        shop_id: item.shop_id,
        body: body,
        // price: '0.01',
        price: item.price,
        openid: app.globalData.openid,
        order_number: item.shop_order_number
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
            that.setData({
              status: 2
            })
            that.getData(that)
            wx.redirectTo({
              url: '../order_list/order_list?index=2',
            })
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (res) {
            console.log(res)
            wx.showToast({ title: '支付失败', icon: 'none', duration: 1000, mask: true })
          }
        })
      })
  },
  /**
   * 取消订单
   */
  cancel_order: function (e) {
    var that = this
    var item = e.currentTarget.dataset.item
    var index = e.currentTarget.dataset.index
    network.httpPost(app.globalData.member_order_cancel,
      {
        order_number: item.shop_order_number,
        shop_id: item.member_id
      },
      function success(res) {
        console.log(res)
        that.data.order_list.splice(index, 1)
        that.setData({
          order_list: that.data.order_list
        })
        wx.showToast({ title: '订单取消成功', icon: 'success', duration: 1000, mask: true })
      })
  },
  /**
   * 确认收货
   */
  confirm_order: function (e) {
    var that = this
    console.log(e.currentTarget.dataset.index)
    network.httpPost(app.globalData.member_order_confirm,
      {
        order_number: e.currentTarget.dataset.item.shop_order_number,
        user_id: app.globalData.user_id
      },
      function success(res) {
        that.data.order_list.splice(e.currentTarget.dataset.index, 1)
        that.setData({
          order_list: that.data.order_list
        })
        wx.showToast({ title: '成功', })
      })
  },
  /**
   * 退款
   */
  refund_order: function (e) {
    var item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../change_refund/change_refund?item=' + item + '&index=' + e.currentTarget.dataset.index,
    })
  },
  /**
   * 评价
   */
  evaluate_order: function (e) {
    console.log(e)
    var item = e.currentTarget.dataset.item
    var list = JSON.stringify(e.currentTarget.dataset.item.member_order_attached)
    wx.navigateTo({
      url: '../good_evaluate_list/good_evaluate_list?list=' + list + '&shop_id=' + item.shop_id
      + '&shop_title=' + item.shop.title,
    })
  },
  /**
   * 查看物流
   */
  check_logistics: function (e) {
    var item = e.currentTarget.dataset.item
    //商品数量
    var num = 0
    for (var i = 0; i < item.member_order_attached.length; i++) {
      num += item.member_order_attached[i].number
    }
    console.log(item)
    wx.navigateTo({
      url: '../logistics_info/logistics_info?picUrl=' + item.member_order_attached[0].thumb_img
      + '&express_value=' + item.express_value + '&express_number=' + item.express_number + '&num=' + num,
    })
  },
  /**
   * 退/换货
   */
  return_order: function (e) {
    var item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../change_refund/change_refund?item=' + item + '&index=' + e.currentTarget.dataset.index,
    })
  },
  /**
   * 退款详情
   */
  refund_detail: function (e) {

    wx.navigateTo({
      url: '../refund_detail/refund_detail?order_number=' + e.currentTarget.dataset.item.shop_order_number + '&index=' + e.currentTarget.dataset.index,
    })
  }

})