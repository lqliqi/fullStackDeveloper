// pages/special_price/special_price.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //展开栏
    is_open: false,
    currentNavtab: 0,
    sale_type: [],
    sale_list: [],
    page: 1,
    parenTid: '',
    hidden: true,
    scroll_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '天天特价',
    })
    wx.request({
      url: app.globalData.sale_type,
      success: function (res) {
        var all = { title: '全部', id: '' }
        that.data.sale_type.push(all);
        that.setData({
          sale_type: that.data.sale_type.concat(res.data.data)
        })
      }
    })
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
    this.data.page = 1;
    this.setData({
      sale_list: []
    })
    this.getData(this)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.page++;
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
    console.log(e)
    if (this.data.is_open) {
      this.setData({
        is_open: !this.data.is_open
      })
      return
    }
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx,
    });
    this.data.page = 1;
    this.data.parenTid = e.currentTarget.dataset.parentid
    this.getData(this)
  },

  clickItem: function (e) {
    console.log(e)
    this.data.page = 1
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx,
      scroll_id: 'a' + e.currentTarget.dataset.idx,
      is_open: false
    })
    this.data.parenTid = e.currentTarget.dataset.parentid
    this.getData(this)
  },
  /**
   * 是否展开
   */
  changeOpen: function () {
    this.setData({
      is_open: !this.data.is_open
    })
  },
  /**
   * 网络加载 
   */
  getData: function (that) {
    that.changeHidden();
    wx.request({
      url: app.globalData.sale_list,
      data: {
        parenTid: that.data.parenTid,
        page: that.data.page
      },
      success: function (res) {
        wx.stopPullDownRefresh();
        that.changeHidden();
        if (that.data.page == 1) {
          that.setData({
            sale_list: res.data.data.data
          })
        } else {
          that.setData({
            sale_list: that.data.sale_list.concat(res.data.data.data)
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
  }
})