// pages/search_rusult/search_rusult..js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    page: 1,
    shop_id: '',
    sale_volume: '',
    order: '',
    second_tab: 1,
    isprice: '',
    parenTid: '',
    title: '',
    double_img: '/images/tu1.png',
    grid: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品列表',
    })
    if (options.title != null) {
      this.setData({
        title: options.title
      })
    }
    console.log(options.parenTid)
    if (options.parenTid != null) {
      this.setData({
        parenTid: options.parenTid
      })
    }
    this.data.shop_id = options.shop_id
    this.multiple()
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
    this.allGet(this)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.page++
    this.allGet(this)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
        title: that.data.title,
        parenTid: that.data.parenTid
      },
      success: function (res) {
        that.changeHidden()
        wx.stopPullDownRefresh()
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
  * 加载框的显示
  */
  changeHidden: function () {
    this.setData({
      hidden: !this.data.hidden
    });
  },
  /**
   * 获取输入的搜索关键字
   */
  key: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  /**
   * 搜索
   */
  search: function () {
    this.allGet(this)
  }
})