// pages/good_combo/good_combo.js
var app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //商品详情
    good_detail: '',
    //参数
    combo_id: '',
    shop_id: '',
    shop_title: '',
    combo: {},
    detail: {},
    size_array: [],
    size: '',
    choose_size: false,
    shop_name:'',
    charges:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '优惠套餐',
    })

    this.data.combo_id = options.combo_id
    this.data.shop_id = options.shop_id
    this.data.shop_title = options.shop_title
    this.data.good_detail = options.detail
    this.data.charges = options.charges
    this.data.shop_name = options.shop_name
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
   * 选择属性
   */
  chooseSize: function (e) {
    var item = e.currentTarget.dataset.item
    var sizes = item.attr.split(',')
    this.data.size_array = new Array(item.goods_attr.length)
    for (var i = 0; i < this.data.size_array.length; i++) {
      this.data.size_array[i] = sizes[i]
    }
    this.setData({
      detail: e.currentTarget.dataset.item,
      size_array: this.data.size_array,
      size: item.attr,
      choose_size: true
    })
  },
  /**
   * 关闭
   */
  close: function () {
    this.setData({
      choose_size: false
    })
  },
  /**
   * 选择规格
   */
  choose: function (e) {
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
  },
  /**
   * 确认规格 
   */
  confirm: function () {
    for (var i = 0; i < this.data.combo.data.length; i++) {
      if (this.data.detail.id == this.data.combo.data[i].id) {
        this.data.combo.data[i].attr = this.data.size
      }
    }
    this.setData({
      combo: this.data.combo,
      choose_size: false
    })
  },
  /**
   * 获取数据
   */
  getData: function (that) {
    network.httpGet(app.globalData.shop_goods_combo_list,
      {
        combo_id: that.data.combo_id,
        shop_id: that.data.shop_id,
        shop_title: that.data.shop_title
      },
      function success(res) {
        that.setData({
          combo: res
        })
      })
  },
  /**
   * 立即购买
   */
  buynow: function () {
    console.log(this.data.good_detail)
    wx.navigateTo({
      url: '../combo_confirm/combo_confirm?combo=' + JSON.stringify(this.data.combo) + '&good_detail=' + this.data.good_detail + '&charges=' + this.data.charges + '&shop_name=' + this.data.shop_name,
    })
  }
})