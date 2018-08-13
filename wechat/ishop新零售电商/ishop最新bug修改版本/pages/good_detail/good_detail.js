// pages/good_detail/good_detail.js
var app = getApp()
var network = require("../../utils/network.js")
var event = require('../../utils/event.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    //商品id
    good_id: '',
    detail: {},
    currentTab: 1,
    web_src: '',
    //选择的规格
    size_array: [],
    size: '',
    //购买价格
    buying_price: '',
    //购买商品数量
    quantity: 1,
    //商品库存
    inventory: 99,
    //是否是购买状态
    buy_status: false,
    //是否是选择地址状态
    choose_status: false,
    block: '距结束还剩:',
    //小时
    h: '',
    //分钟
    m: '',
    //秒
    s: '',
    //倒计时剩余时间
    leftTime: '',
    //是否是限时抢购
    isrush: false,
    //是否是特价商品
    isSpecail: false,
    //收货地址列表
    address_list: [],
    //当前地址的id
    address_id: '',
    //当前的地址
    address: '',
    //运费
    freight_price: '',
    //收藏状态
    collect_status: '',
    //天天特价价格
    sale_price: '',
    //是否刷新
    is_refresh: false,
    //传入下一页的地址
    ios_address: '',
    //天天特价 限时抢购1 正常商品0
    limited_status: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '详情',
    })
    that.setData({
      good_id: options.id
    })
    if (options.is_rush != null) {
      that.setData({
        isrush: true,
        limited_status: 1
      })
    }
    if (options.isSpecail != null) {
      that.setData({
        isSpecail: true,
        limited_status: 1,
        sale_price: options.sale_price
      })
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
    if (this.data.is_refresh) {
      this.getData(this)
      this.data.is_refresh = false
    }
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
   * 图文详情
   */
  graphic: function () {
    this.setData({
      currentTab: 1
    })
    wx.navigateTo({
      url: '../good_detail_web/good_detail_web?id=' + this.data.good_id,
    })
  },
  /**
   * 规格参数
   */
  parameter: function () {
    this.setData({
      currentTab: 2
    })
    wx.navigateTo({
      url: '../good_specification_web/good_specification_web?id=' + this.data.good_id,
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
   * 获取数据
   */
  getData: function (that) {
    that.changeHidden();
    wx.request({
      url: app.globalData.shop_goods,
      data: {
        id: that.data.good_id,
        user_id: app.globalData.user_id
      },
      success: function (res) {
        that.changeHidden();
        console.log(res)
        that.setData({
          detail: res.data,
          web_src: app.globalData.good_image_text + '?id=' + that.data.good_id,
          buying_price: res.data.data.price,
          address_list: res.data.address,
          address_id: res.data.freight.address_id,
          address: res.data.freight.address,
          freight_price: res.data.freight.price,
          collect_status: res.data.data.collection_status,
          ios_address: res.data.freight.ios_address

        })
        //判断是否为限时抢购
        if (res.data.data.limited_time != null) {
          that.setData({
            leftTime: res.data.data.limited_time - res.data.data.now_time,
            buying_price: res.data.data.special
          })
          that.countdown(that)
        }
        that.data.size_array = new Array(res.data.data.goods_attr.length)
        for (var i = 0; i < that.data.size_array.length; i++) {
          that.data.size_array[i] = ''
        }
      }
    })
  },
  /**
   * 选择规格
   */
  chooseSize: function (e) {
    var that = this
    this.data.size = ''
    this.data.size_array[e.currentTarget.dataset.index] = e.currentTarget.dataset.data
    this.setData({
      size_array: this.data.size_array
    })
    for (var i = 0; i < this.data.size_array.length; i++) {
      if (this.data.size_array[i] != '') {
        this.data.size += this.data.size_array[i] + ','
      }
    }
    this.data.size = this.data.size.substr(0, this.data.size.length - 1)
    this.setData({
      size: this.data.size
    })
    //特价商品不同规格为同一价格
    if (!that.data.isSpecail && !that.data.isrush) {
      that.changeHidden()
      wx.request({
        url: app.globalData.goods_attr_gain,
        data: {
          goods_id: that.data.good_id,
          attr: that.data.size
        },
        success: function (res) {
          that.changeHidden()
          if (res.data.data != null) {
            that.setData({
              buying_price: res.data.data.price,
              inventory: res.data.data.inventory
            })
            if (that.data.quantity > that.data.inventory) {
              that.setData({
                quantity: that.data.inventory
              })
            }
          }
        }
      })
    }
  },
  /**
   * 立即购买
   */
  buynow: function () {
    for (var i = 0; i < this.data.size_array.length; i++) {
      if (this.data.size_array[i] == '') {
        wx.showToast({ title: '请选择规格', icon: 'none', duration: 1000, mask: true })
        return
      }
    }
    if (this.data.quantity <= 0) {
      wx.showToast({ title: '请选择商品数量', icon: 'none', duration: 1000, mask: true })
      return
    }
    //传入下一页面
    //是否是限时抢购或者天天特价
    var usable = !(this.data.isrush || this.data.isSpecail)
    //地址json
    var address = JSON.stringify(this.data.ios_address)
    //店铺id
    var shop_id = this.data.detail.data.member_id
    //店铺名称
    var shop_title = this.data.detail.data.shop.title
    //商品图片
    var good_picUrl = this.data.detail.data.picArr[0]
    //商品名称
    var good_title = this.data.detail.data.title
    //商品id
    var good_id = this.data.good_id
    //商品规格
    var size = this.data.size
    //商品价格
    var price = this.data.buying_price
    //商品数量
    var num = this.data.quantity
    //运费
    var freight_price = this.data.freight_price
    //返利
    var charges = this.data.detail.data.charges
    //百分比
    var rebate_percentage = this.data.detail.data.rebate_percentage
    //商品类型 限时抢购 天天特价1 正常0
    wx.navigateTo({
      url: '../confirm_order/confirm_order?address=' + address + '&shop_id=' + shop_id + '&shop_title=' + shop_title + '&good_title=' + good_title + '&good_id=' + good_id + '&size=' + size + '&price=' + price + '&num=' + num + '&freight_price=' + freight_price + '&good_picUrl=' + good_picUrl + '&charges=' + charges + '&rebate_percentage=' + rebate_percentage + '&usable=' + usable + '&limited_status=' + this.data.limited_status,
    })
  },
  /**
   * 减少数量
   */
  reduce: function () {
    if (this.data.quantity != 1) {
      this.setData({
        quantity: this.data.quantity - 1
      })
    } else {
      wx.showToast({ title: '数量不能再减少了', icon: 'none', duration: 1000, mask: true })
    }
  },
  /**
   * 增加数量
   */
  increase: function () {
    if (this.data.quantity < this.data.inventory) {
      this.setData({
        quantity: this.data.quantity + 1
      })
    } else {
      wx.showToast({ title: '已达到该商品最大数量', icon: 'none', duration: 1000, mask: true })
    }
  },
  /**
   * 立即购买
   */
  buy_now: function () {
    this.setData({
      buy_status: true,
    })
  },
  /**
   * 关闭购买窗口
   */
  close_buy: function () {
    this.setData({
      buy_status: false,
    })
  },
  /**
   * 倒计时
   */
  countdown: function (that) {
    var total_micro_second = that.data.leftTime || [];
    that.dateformat(total_micro_second)
    if (total_micro_second <= 0) {
      that.setData({
        clock: "抢购已结束"
      });
    } else {
      setTimeout(function () {
        total_micro_second -= 1;
        that.data.leftTime -= 1;
        that.countdown(that);
      }, 1000)
    }
  },

  // 时间格式化输出，如11:03 25:19 每1s都会调用一次
  dateformat: function (micro_second) {
    // 总秒数
    var second = Math.floor(micro_second);
    // 天数
    var day = Math.floor(second / 3600 / 24);
    // 小时
    var hr = Math.floor(second / 3600 % 24);
    // 分钟
    var min = Math.floor(second / 60 % 60);
    // 秒
    var sec = Math.floor(second % 60);
    this.setData({
      h: hr,
      m: min,
      s: sec
    })
    return day + "天" + hr + "小时" + min + "分钟" + sec + "秒";
  },
  /**
   * 选择地址 送至
   */
  choose_address: function () {
    if (this.data.address.length == 0) {
      wx.navigateTo({
        url: '../edit_address/edit_address',
      })
    } else {
      this.setData({
        choose_status: !this.data.choose_status,
      })
    }

  },
  /**
   * 关闭选择地址
   */
  close_address: function () {
    this.setData({
      choose_status: !this.data.choose_status,
      address_id: this.data.detail.freight.address_id,
    })
  },
  /**
   * 选择地址
   */
  chooseaddress: function (e) {
    this.setData({
      address_id: e.currentTarget.dataset.id
    })
  },
  /**
   * 确认地址
   */
  confirm_address: function () {
    var that = this;
    that.changeHidden();
    wx.request({
      url: app.globalData.changefright,
      data: {
        freight_id: that.data.address_id,
        shop_id: that.data.detail.data.member_id
      },
      success: function (res) {
        console.log(res)
        that.changeHidden();
        that.setData({
          address: res.data.freight.address,
          freight_price: res.data.freight.price,
          choose_status: !that.data.choose_status,
          ios_address: res.data.freight.ios_address
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
    if (that.data.collect_status == 2) {
      wx.request({
        url: app.globalData.collect_create,
        method: 'POST',
        data: {
          id: that.data.good_id,
          type_id: 1,
          user_id: app.globalData.user_id
        },
        success: function (res) {
          wx.showToast({ title: '收藏成功', icon: 'succes', duration: 1000, mask: true })
          that.setData({
            collect_status: 1
          })
        }
      })
    } else {
      wx.request({
        url: app.globalData.good_collect_del,
        data: {
          id: that.data.good_id,
          user_id: app.globalData.user_id
        },
        success: function (res) {
          that.setData({
            collect_status: 2
          })
          wx.showToast({ title: '取消收藏成功', icon: 'succes', duration: 1000, mask: true })
        }
      })
    }
  },
  /**
   * 客服
   */
  callPhone: function () {
    var that = this
    wx.showModal({
      title: '是否拨打客服电话',
      content: '',
      confirmColor: '#e73c0a',
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: that.data.detail.data.shop.phone,
          })
        }
      }
    })
  },
  /**
   * 加入购物车
   */
  addCart: function () {
    var that = this
    for (var i = 0; i < this.data.size_array.length; i++) {
      if (this.data.size_array[i] == '') {
        wx.showToast({ title: '请选择规格', icon: 'none', duration: 1000, mask: true })
        return
      }
    }
    if (that.data.quantity <= 0) {
      wx.showToast({ title: '请选择商品数量', icon: 'none', duration: 1000, mask: true })
      return
    }
    network.httpGet(app.globalData.member_shopping_cart_create,
      {
        attr: that.data.size,
        id: that.data.good_id,
        number: that.data.quantity,
        price: that.data.buying_price,
        user_id: app.globalData.user_id,
        limited_status: 0
      },
      function success(res) {
        that.setData({
          buy_status: false
        })
        event.emit('refresh_cart')
        wx.showToast({ title: '加入购物车成功', icon: 'success', duration: 1000, mask: true })
      })
  },
  /**
   * 优惠套餐
   */
  goCombo: function () {

    wx.navigateTo({
      url: '../good_combo/good_combo?shop_id=' + this.data.detail.data.member_id + '&shop_title=' + this.data.detail.data.title + '&combo_id=' + this.data.detail.data.combo_id + '&detail=' + JSON.stringify(this.data.detail) + '&shop_name=' + this.data.detail.data.shop.title + '&charges=' + this.data.detail.data.charges,
    })
  },
  /**
   * 照片
   */
  photo: function (e) {
    wx.navigateTo({
      url: '../photo/photo?list=' + JSON.stringify(this.data.detail.data.picArr) + '&index=' + e.currentTarget.dataset.index,
    })
  }
})