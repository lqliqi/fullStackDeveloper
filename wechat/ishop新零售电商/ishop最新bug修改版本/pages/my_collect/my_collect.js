// pages/my_collect/my_collect.js
var app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab: ["商品", "店铺"],
    currentNavtab: "0",
    //参数
    type_id: 1,
    page: 1,
    //收藏商品列表
    collect_list: [],
    //收藏店铺列表
    collect_shop_list: [],
    //编辑状态 
    edit: true,
    //是否全选
    is_all: false,
    //选中的
    select_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '收藏',
    })
    this.data.type_id = options.type_id
    if (options.type_id == 1) {
      this.setData({
        currentNavtab: 0,

      })
    } else {
      this.setData({
        currentNavtab: 1,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getData(this)
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
    this.clearSelect()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.page++
    this.getData(this)
    this.clearSelect()
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
      currentNavtab: e.currentTarget.dataset.idx,
      edit: true
    });
    //商品列表
    if (e.currentTarget.dataset.idx == 0) {
      this.data.type_id = 1
    } else {
      this.data.type_id = 2
    }
    this.setData({
      type_id: this.data.type_id
    })
    this.getData(this)
    this.clearSelect()
  },

  /**
   * 改变编辑状态
   */
  edit: function () {
    this.setData({
      edit: !this.data.edit
    })

  },
  /**
   * 点击商品
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
      for (var i = 0; i < this.data.collect_list.length; i++) {
        if (this.data.collect_list[i].id == id) {
          this.data.collect_list[i].check = !this.data.collect_list[i].check;
          this.setData({
            collect_list: this.data.collect_list
          })
        }
      }
      this.data.select_id = ''
      this.data.is_all = this.data.collect_list[0].check
      for (var i = 0; i < this.data.collect_list.length; i++) {
        this.data.is_all = this.data.is_all && this.data.collect_list[i].check
        if (this.data.collect_list[i].check) {
          this.data.select_id += this.data.collect_list[i].id + ','
        }
      }
      this.setData({
        is_all: this.data.is_all
      })
    }
  },
  /**
   * 点击店铺
   */
  clickShop: function (e) {
    var shop_id = e.currentTarget.dataset.shop
    var id = e.currentTarget.dataset.id

    //跳转店铺
    if (this.data.edit) {
      wx.navigateTo({
        url: '../shop_details/shop_details?shop_id=' + shop_id,
      })
    } else {
      //选中
      for (var i = 0; i < this.data.collect_shop_list.length; i++) {
        if (this.data.collect_shop_list[i].id == id) {
          this.data.collect_shop_list[i].check = !this.data.collect_shop_list[i].check;
          this.setData({
            collect_shop_list: this.data.collect_shop_list
          })
        }
      }
      this.data.select_id = ''
      this.data.is_all = this.data.collect_shop_list[0].check
      for (var i = 0; i < this.data.collect_shop_list.length; i++) {
        this.data.is_all = this.data.is_all && this.data.collect_shop_list[i].check
        if (this.data.collect_shop_list[i].check) {
          this.data.select_id += this.data.collect_shop_list[i].id + ','
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
    //全选商品
    if (this.data.currentNavtab == 0) {
      for (var i = 0; i < this.data.collect_list.length; i++) {
        this.data.collect_list[i].check = this.data.is_all
        if (this.data.is_all) {
          this.data.select_id += this.data.collect_list[i].id + ','
        }
      }
    } else {
      //全选店铺
      for (var i = 0; i < this.data.collect_shop_list.length; i++) {
        this.data.collect_shop_list[i].check = this.data.is_all
        if (this.data.is_all) {
          this.data.select_id += this.data.collect_shop_list[i].id + ','
        }
      }
    }

    this.setData({
      is_all: this.data.is_all,
      collect_list: this.data.collect_list,
      collect_shop_list: this.data.collect_shop_list
    })
  },
  /**
   * 清除选中状态
   */
  clearSelect: function () {
    this.data.select_id = ''
    this.data.is_all = false
    for (var i = 0; i < this.data.collect_list.length; i++) {
      this.data.collect_list[i].check = false
    }
    this.setData({
      is_all: this.data.is_all,
      collect_list: this.data.collect_list
    })
  },
  /**
   * 获取数据
   */
  getData: function (that) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.my_collect_list,
      data: {
        user_id: app.globalData.user_id,
        type_id: that.data.type_id,
        page: that.data.page
      },
      success: function (res) {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        //收藏商品
        if (that.data.type_id == 1) {
          if (that.data.page == 1) {
            that.setData({
              collect_list: res.data.data.data
            })
          } else {
            that.setData({
              collect_list: that.data.collect_list.concat(res.data.data.data)
            })
          }
          for (var i = 0; i < that.data.collect_list.length; i++) {
            that.data.collect_list[i]['check'] = false;
          }
          that.setData({
            collect_list: that.data.collect_list
          })
        } else {
          //收藏店铺
          if (that.data.page == 1) {
            that.setData({
              collect_shop_list: res.data.data.data
            })
          } else {
            that.setData({
              collect_shop_list: that.data.collect_shop_list.concat(res.data.data.data)
            })
          }
          for (var i = 0; i < that.data.collect_shop_list.length; i++) {
            that.data.collect_shop_list[i]['check'] = false;
          }
          that.setData({
            collect_shop_list: that.data.collect_shop_list
          })
        }
      }
    })
  },
  /**
   * 取消收藏
   */
  delete: function () {
    var that = this
    //取消收藏商品
    if (this.data.currentNavtab == 0) {
      if (this.data.select_id == '') {
        wx.showToast({ title: '请选择商品', icon: 'none', duration: 1000, mask: true })
        return
      }
    } else {
      //取消收藏店铺
      if (this.data.select_id == '') {
        wx.showToast({ title: '请选择店铺', icon: 'none', duration: 1000, mask: true })
        return
      }
    }
    network.httpGet(app.globalData.member_collect_del,
      {
        id: that.data.select_id,
        user_id: app.globalData.user_id
      },
      function success(res) {
        that.setData({
          edit: !that.data.edit
        })
        that.onPullDownRefresh()
        wx.showToast({ title: '取消收藏成功', icon: 'success', duration: 1000, mask: true })
      })
  }
})