// pages/goods_evaluate/goods_evaluate.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    goods_id: '',
    grade: '',
    img: '',
    page: 1,
    evaluate_list: [],
    statistics: {},
    current_level: '1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品评论',
    })
    console.log(options.id)
    this.data.goods_id = options.id
    if (options.level != null) {
      this.setData({
        current_level: options.level
      })
    }
    this.getEvaluateData(this)
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
    this.getEvaluateData(this)
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
   * 请求数据
   */
  getEvaluateData: function (that) {
    that.changeHidden()
    wx.request({
      url: app.globalData.goods_evaluate_combo_list,
      data: {
        goods_id: that.data.goods_id,
        grade: that.data.grade,
        img: that.data.img,
        page: that.data.page
      },
      success: function (res) {
        wx.stopPullDownRefresh()
        that.changeHidden()
        if (that.data.page == 1) {
          that.setData({
            evaluate_list: res.data.data.data,
            statistics: res.data.statistics
          })
        } else {
          that.setData({
            evaluate_list: that.data.evaluate_list.concat(res.data.data.data)
          })
        }
      }
    })
  },
  /**
   * 全部评论
   */
  all_level: function () {
    this.setData({
      current_level: 1,
      grade: '',
      img: ''
    })
    this.getEvaluateData(this)
  },
  /**
   * 好评
   */
  good_level: function () {
    this.setData({
      current_level: 2,
      grade: '4',
      img: ''
    })
    this.getEvaluateData(this)
  },
  /**
   * 中评
   */
  center_level: function () {
    this.setData({
      current_level: 3,
      grade: '3',
      img: ''
    })
    this.getEvaluateData(this)
  },
  /**
   * 差评
   */
  bad_level: function () {
    this.setData({
      current_level: 4,
      grade: '2',
      img: ''
    })
    this.getEvaluateData(this)
  },
  /**
   * 晒图
   */
  img_level: function () {
    this.setData({
      current_level: 5,
      grade: '',
      img: true
    })
    this.getEvaluateData(this)
  },
  /**
   * 加载框的显示
   */
  changeHidden: function () {
    this.setData({
      hidden: !this.data.hidden
    });
  }
})