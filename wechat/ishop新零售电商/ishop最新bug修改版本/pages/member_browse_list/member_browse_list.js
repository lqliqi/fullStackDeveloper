// pages/member_browse_list/member_browse_list.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    browse_list: [],
    edit: true,
    //被选中的id
    select_id: '',
    //是否全部选中
    is_all: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '浏览记录',
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
   * 获取数据
   */
  getData: function (that) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.member_browse_list,
      data: {
        user_id: app.globalData.user_id
      },
      success: function (res) {
        wx.hideLoading()
        that.setData({
          browse_list: res.data.data
        })
        for (var i = 0; i < that.data.browse_list.length; i++) {
          for (var j = 0; j < that.data.browse_list[i].list.length; j++) {
            that.data.browse_list[i].list[j]['check'] = false;
          }
        }
      }
    })
  },
  /**
   * 改变编辑状态
   */
  edit: function () {
    for (var i = 0; i < this.data.browse_list.length; i++) {
      for (var j = 0; j < this.data.browse_list[i].list.length; j++) {
        this.data.browse_list[i].list[j]['check'] = false;
      }
    }
    this.setData({
      edit: !this.data.edit,
      browse_list: this.data.browse_list
    })

  },
  /**
   * 点击
   */
  click: function (e) {
    var goods_id = e.currentTarget.dataset.goods_id
    var id = e.currentTarget.dataset.id
    //跳转商品
    if (this.data.edit) {
      wx.navigateTo({
        url: '../good_detail/good_detail?id=' + goods_id,
      })
    } else {
      //选中
      for (var i = 0; i < this.data.browse_list.length; i++) {
        for (var j = 0; j < this.data.browse_list[i].list.length; j++) {
          if (this.data.browse_list[i].list[j].id == id) {
            this.data.browse_list[i].list[j].check = !this.data.browse_list[i].list[j].check;
            this.setData({
              browse_list: this.data.browse_list
            })
          }
        }
      }
      this.data.select_id = ''
      this.data.is_all = this.data.browse_list[0].list[0].check
      for (var i = 0; i < this.data.browse_list.length; i++) {
        for (var j = 0; j < this.data.browse_list[i].list.length; j++) {
          this.data.is_all = this.data.is_all && this.data.browse_list[i].list[j].check
          if (this.data.browse_list[i].list[j].check) {
            this.data.select_id += this.data.browse_list[i].list[j].id + ','
          }
        }
      }
      this.setData({
        is_all: this.data.is_all
      })
    }
  },
  /**
   * 全选
   */
  select_all: function () {
    this.data.select_id = ''
    this.data.is_all = !this.data.is_all
    for (var i = 0; i < this.data.browse_list.length; i++) {
      for (var j = 0; j < this.data.browse_list[i].list.length; j++) {
        this.data.browse_list[i].list[j].check = this.data.is_all
        if (this.data.is_all) {
          this.data.select_id += this.data.browse_list[i].list[j].id + ','
        }
      }
    }
    this.setData({
      is_all: this.data.is_all,
      browse_list: this.data.browse_list
    })
  },
  /**
   * 删除
   */
  delete: function () {
    var that = this
    wx.showLoading({
      title: '加载中...',
    })
    if (this.data.select_id == '') {
      wx.showToast({ title: '请选择要删除的记录', icon: 'none', duration: 1000, mask: true })
      return
    }
    wx.request({
      url: app.globalData.member_browse_del,
      data: {
        id: that.data.select_id
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.code == 200) {
          wx.showToast({ title: '删除成功', icon: 'none', duration: 1000, mask: true })
          that.setData({
            edit: !that.data.edit
          })
          that.getData(that)
        } else {
          wx.showToast({ title: res.data.message, icon: 'none', duration: 1000, mask: true })
        }
      }
    })
  }
})