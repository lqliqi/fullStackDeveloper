// pages/shop_details/shop_details.js
var app = getApp()
var event = require('../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    //是否是首页
    is_index: true,
    //是否是全部商品
    is_all: false,
    //是否是促销产品
    is_promotion: false,
    //是否是上新商品
    is_new: false,
    list: ['店铺首页', '全部商品', '促销', '上新'],
    currentTab: 0,
    shop_id: '',
    double_img: '/images/tu1.png',
    shop_data: {},
    index_data: {},
    zy: true,
    second_tab: 1,
    page: 1,
    //是否为两行显示
    grid: true,
    //商品列表
    goods_list: [],
    //上新列表
    new_goods_list: [],
    //销量字段
    sale_volume: '',
    //排序方式
    order: '',
    //新品字段
    new_good: '',
    //价格字段
    isprice: 0,
    //搜索关键字
    key: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      shop_id: options.shop_id
    })
    this.data.shop_id = options.shop_id
    wx.setNavigationBarTitle({
      title: '店铺',
    })
    that.getShopData(that)
    this.indexGet(this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    event.on('changeCollect', this, function (status) {
      console.log(that.data.shop_data.collect_state.length)
      if (status) {
        that.data.shop_data.collect_state = 1
        that.data.shop_data.data.collect_number++
      } else {
        that.data.shop_data.collect_state = ''
        that.data.shop_data.data.collect_number--
      }
      that.setData({
        shop_data: that.data.shop_data
      })
    })
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
    event.remove('changeCollect', this)
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
    var that = this
    this.data.page++;
    switch (this.data.currentTab) {
      // 店铺首页
      case 0:
        that.indexGet(that)
        break;
      //全部商品
      case 1:
        that.allGet(that)
        break;
      //促销
      case 2:
        that.promotionGet(that)
        break
    }

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
    var that = this
    that.data.page = 1
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    switch (this.data.currentTab) {
      // 店铺首页
      case 0:
        that.setData({
          is_index: true,
          is_all: false,
          is_promotion: false,
          is_new: false
        })
        that.indexGet(that)
        break;
      //全部商品
      case 1:
        that.setData({
          is_index: false,
          is_all: true,
          is_promotion: false,
          is_new: false
        })
        //默认点击综合
        that.multiple(that)
        break;
      //促销
      case 2:
        that.setData({
          is_index: false,
          is_all: false,
          is_promotion: true,
          is_new: false
        })
        that.promotionGet(that)
        break;
      case 3:
        that.setData({
          is_index: false,
          is_all: false,
          is_promotion: false,
          is_new: true
        })
        that.newclothesGet(that)
        break;
    }
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
   * 店铺首页
   */
  indexGet: function (that) {
    that.changeHidden()
    wx.request({
      url: app.globalData.shop_index,
      data: {
        user_id: app.globalData.user_id,
        shop_id: that.data.shop_id,
        page: that.data.page
      },
      success: function (res) {
        console.log(res)
        that.changeHidden()
        if (that.data.page == 1) {
          that.setData({
            index_data: res.data,
            goods_list: res.data.goods_list.data
          })
        } else {
          that.setData({
            goods_list: that.data.goods_list.concat(res.data.goods_list.data)
          })
        }
      }
    })
  },
  /**
   * 全部商品
   */
  allGet: function (that) {
    that.changeHidden()
    wx.request({
      url: app.globalData.shop_good_list,
      data: {
        page: that.data.page,
        user_id: that.data.shop_id,
        rank: that.data.sale_volume,
        order: that.data.order,
      },
      success: function (res) {
        that.changeHidden()
        if (that.data.page == 1) {
          that.setData({
            goods_list: res.data.data.data
          })
        } else {
          that.setData({
            goods_list: that.data.goods_list.concat(res.data.data.data)
          })
        }
      }
    })

  },
  /**
   * 促销商品
   */

  promotionGet: function (that) {
    that.changeHidden()
    wx.request({
      url: app.globalData.shop_good_list,
      data: {
        page: that.data.page,
        user_id: that.data.shop_id,
        promotion: 1
      },
      success: function (res) {
        that.changeHidden()
        if (that.data.page == 1) {
          that.setData({
            goods_list: res.data.data.data
          })
        } else {
          that.setData({
            goods_list: that.data.goods_list.concat(res.data.data.data)
          })
        }
      }
    })
  },
  /**
   * 上新
   */
  newclothesGet: function (that) {
    that.changeHidden()
    wx.request({
      url: app.globalData.shop_new_list,
      data: {
        page: that.data.page,
        user_id: that.data.shop_id
      },
      success: function (res) {
        that.changeHidden()
        that.setData({
          new_goods_list: res.data.data
        })
      }
    })
  },
  /**
   * 点击综合
   */
  multiple: function () {
    this.data.page = 1
    this.data.sale_volume = ''
    this.data.order = ''
    this.setData({
      second_tab: 1,
      isprice: 0,
    })
    this.allGet(this)
  },
  /**
   * 点击销量
   */
  salenum: function () {
    this.data.page = 1
    this.data.sale_volume = 'desc'
    this.data.order = 'sale_number'
    this.setData({
      second_tab: 2,
      isprice: 0,
    })
    this.allGet(this)
  },
  /**
   * 点击新品
   */
  newgood: function () {
    this.data.page = 1
    this.data.sale_volume = ''
    this.data.order = 'create_time'
    this.setData({
      second_tab: 3,
      isprice: 0,
    })
    this.allGet(this)
  },
  /**
   * 点击价格
   */
  price: function () {
    this.data.page = 1
    this.data.sale_volume = ''
    this.data.order = 'price'
    this.setData({
      second_tab: 4,
    })
    if (this.data.isprice == 2) {
      this.setData({
        isprice: 1,
        sale_volume: 'desc'
      })
    } else {
      this.setData({
        isprice: 2,
        sale_volume: 'asc'
      })
    }
    this.allGet(this)
  },
  /**
   * 是否两行显示
   */
  change: function () {
    var that = this
    if (that.data.grid) {
      this.setData({
        double_img: '/images/tu2.png',
        grid: !that.data.grid
      })
    } else {
      this.setData({
        double_img: '/images/tu1.png',
        grid: !that.data.grid
      })
    }
  },

  /**
   * 获取店铺信息
   */
  getShopData: function (that) {
    that.changeHidden();
    //店铺信息
    wx.request({
      url: app.globalData.shop_detail,
      data: {
        shop_id: that.data.shop_id,
        user_id: app.globalData.user_id
      },
      success: function (res) {
        console.log(res)
        that.changeHidden();
        that.setData({
          shop_data: res.data
        })
        //是否是自营
        if (res.data.data.type == 1) {
          that.setData({
            zy: false
          })
        }
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
      wx.request({
        url: app.globalData.collect_create,
        method: 'POST',
        data: {
          id: that.data.shop_id,
          type_id: 2,
          user_id: app.globalData.user_id
        },
        success: function (res) {
          wx.showToast({ title: '收藏成功', icon: 'succes', duration: 1000, mask: true })
          that.getShopData(that)
        }
      })
    } else {
      wx.request({
        url: app.globalData.collect_del,
        data: {
          id: that.data.shop_id,
          user_id: app.globalData.user_id
        },
        success: function (res) {
          wx.showToast({ title: '取消收藏成功', icon: 'succes', duration: 1000, mask: true })
          that.getShopData(that)
        }
      })
    }
  },
  /**
   * 领取优惠券
   */
  getcoupon: function (e) {
    var that = this
    wx.request({
      url: app.globalData.get_coupon,
      data: {
        coupon_id: e.currentTarget.dataset.couponid,
        user_id: app.globalData.user_id
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx.showToast({ title: '领取成功', icon: 'succes', duration: 1000, mask: true })
          that.indexGet(that)
        } else {
          wx.showToast({ title: res.data.message, icon: 'none', duration: 1000, mask: true })
        }
      }
    })
  },
  /**
   * 搜索关键字
   */
  keyInput: function (e) {
    this.setData({
      key: e.detail.value.replace(/[ ]/g, "")
    })

  },
  /**
   * 搜索
   */
  search: function () {
    if(this.data.key.length==0){
      wx.showToast({ title: '请输入搜索关键字', icon: 'none', duration: 1000, mask: true })
      return
    }
    wx.navigateTo({
      url: '../search_result/search_result?shop_id=' + this.data.shop_id + '&title=' + this.data.key,
    })
  },
  /**
   * 联系卖家
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
            phoneNumber: that.data.shop_data.data.phone,
          })
        }
      }
    })
  }
})