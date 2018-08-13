// pages/cotegory/cotegory.js
var app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //表格布局
    grid: true,
    //是否是筛选
    is_filtrate: false,
    //筛选
    filter: false,
    currentTab: 1,
    //价格顺序
    order: '',
    //价格区间最小值
    price_min: '',
    value_min: '',
    //价格区间最大值
    value_max: '',
    price_max: '',
    //筛选条件
    class_id: '',
    rank: '',
    page: 1,
    //商品列表
    goods_list: [],
    total: '',
    //搜索商品title
    title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品列表',
    })
    if (options.class_id != null) {
      this.data.class_id = options.class_id
    }
    if (options.title != null) {
      this.setData({
        title: options.title
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
    if (this.data.total != this.data.goods_list.length) {
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
   * 搜索商品的文字
   */
  search_input: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  /**
   * 搜索
   */
  search: function () {
    if (this.data.title == '') {
      wx.showToast({ title: '请输入搜索关键字', icon: 'none', duration: 1000, mask: true })
    } else {
      this.data.page = 1
      this.getData(this)
    }
  },
  /**
   * 切换表格布局
   */
  changeCate: function () {
    this.setData({
      grid: !this.data.grid
    })
  },
  /**
   * 点击综合
   */
  onComposite: function (e) {
    if (this.data.is_filtrate) {
      this.setData({
        is_filtrate: !this.data.is_filtrate
      })
    } else {
      this.setData({
        currentTab: 1,
        order: '',
        page: 1,
        order: '',
        rank: ''
      })
      this.getData(this)
    }

  },
  /**
   * 点击销量
   */
  onSaleClick: function (e) {
    if (this.data.is_filtrate) {
      this.setData({
        is_filtrate: !this.data.is_filtrate
      })
    } else {
      this.setData({
        currentTab: 2,
        page: 1,
        rank: 'desc',
        order: 'sale_number'
      })
      this.getData(this)
    }
  },
  /**
   * 点击价格
   */
  onPriceClick: function (e) {
    if (this.data.is_filtrate) {
      this.setData({
        is_filtrate: !this.data.is_filtrate
      })
    } else {
      if (this.data.rank == 'asc') {
        this.data.rank = 'desc'
      } else {
        this.data.rank = 'asc'
      }
      this.setData({
        currentTab: 3,
        page: 1,
        order: 'price',
        rank: this.data.rank
      })
      this.getData(this)
    }
  },
  /**
   * 点击筛选
   */
  changeFilter: function () {
    this.setData({
      is_filtrate: !this.data.is_filtrate
    })
  },
  /**
   * 最小价格
   */
  min: function (e) {
    this.setData({
      value_min: e.detail.value == 0 ? '' : e.detail.value
    })
  },
  /**
   * 最大价格
   */
  max: function (e) {
    this.setData({
      value_max: e.detail.value == 0 ? '' : e.detail.value
    })
  },
  /**
   * 重置筛选
   */
  reset: function () {
    this.setData({
      is_filtrate: false,
      value_min: '',
      value_max: '',
      price_min: '',
      price_max: '',
      filter: false,
      page: 1
    })
    this.getData(this)
  },
  /**
   * 筛选确定
   */
  submit: function () {
    if (this.data.value_min == '') {
      wx.showToast({ title: '请输入最低价', icon: 'none', duration: 1000, mask: true })
    } else if (this.data.value_max == '') {
      wx.showToast({ title: '请输入最最高价', icon: 'none', duration: 1000, mask: true })
    } else if (this.data.value_max < this.data.value_min) {
      wx.showToast({ title: '价格区间输入有误', icon: 'none', duration: 1000, mask: true })
    } else {
      this.setData({
        price_min: this.data.value_min,
        price_max: this.data.value_max,
        filter: true,
        is_filtrate: false
      })
      this.getData(this)
    }
  },
  /**
   * 获取商品列表
   */
  getData: function (that) {
    network.httpGet(app.globalData.shop_goods_list,
      {
        class_id: that.data.class_id,
        high_price: that.data.price_max,
        low_price: that.data.price_min,
        order: that.data.order,
        rank: that.data.rank,
        title: that.data.title,
        page: that.data.page
      },
      function success(res) {
        console.log(res)
        if (that.data.page == 1) {
          that.setData({
            goods_list: res.data.data,
            total: res.data.total
          })
        } else {
          that.setData({
            goods_list: that.data.goods_list.concat(res.data.data),
          })
        }
      })
  }
})