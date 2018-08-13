// pages/edit_address/edit_address.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否是默认
    is_default: false,
    //地址
    address: '',
    //地址id
    area_id: '',
    //收货人
    consignee: '',
    //联系号码
    contact_num: '',
    //详细地址
    detail_address: '',
    item: '',
    city: [],
    index: [0, 0, 0],
    //第几列
    column: 0,
    //值
    value: '',
    one: 0,
    two: 0,
    three: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.item != null) {
      wx.setNavigationBarTitle({
        title: '修改地址',
      })
      let item = JSON.parse(options.item);
      this.data.item = item
      this.setData({
        detail_address: item.address,
        area_id: item.area_id,
        address: item.area_info,
        consignee: item.name,
        contact_num: item.phone,
        is_default: item.status == 1 ? true : false
      })
    } else {
      wx.setNavigationBarTitle({
        title: '添加新地址',
      })
    }

    this.getProvinceList(this)

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
   * 获取省
   */
  getProvinceList: function (that) {
    var network = require("../../utils/network.js")
    network.httpGet(app.globalData.area_province_list, '', function success(res) {
      that.data.city.push(res.data)
      that.setData({
        city: that.data.city
      })
      that.getCityList(that)
    })
  },
  /**
   * 获取市
   */
  getCityList: function (that) {
    var network = require("../../utils/network.js")
    network.httpGet(app.globalData.area_city_list, { area_id: that.data.city[0][0].area_id }, function success(res) {
      
      that.data.city.push(res.data)
      that.setData({
        city: that.data.city
      })
      that.getAreaList(that)
    })
  },
  /**
   * 获取地区
   */
  getAreaList: function (that) {
    var network = require("../../utils/network.js")
    network.httpGet(app.globalData.area_area_list, { area_id: that.data.city[1][0].area_id }, function success(res) {
      that.data.city.push(res.data)
      that.setData({
        city: that.data.city
      })
    })
  },
  /**
   * 更改市
   */
  changeCityList: function (that) {
    var network = require("../../utils/network.js")
    network.httpGet(app.globalData.area_city_list, { area_id: that.data.city[0][that.data.one].area_id }, function success(res) {
      that.data.city[1] = res.data
      that.setData({
        city: that.data.city
      })
      that.changeArea(that)
    })
  },
  /**
   * 更改区域
   */
  changeArea: function (that) {
    var network = require("../../utils/network.js")
    network.httpGet(app.globalData.area_city_list, { area_id: that.data.city[1][that.data.two].area_id }, function success(res) {
      that.data.city[2] = res.data
      that.setData({
        city: that.data.city
      })
    })
  },
  /**
   * picker点击确定
   */
  pickerChange: function (e) {
    this.setData({
      address: this.data.city[0][this.data.one].area_name + " " + this.data.city[1][this.data.two].area_name + " " + this.data.city[2][this.data.three].area_name,
    })
    this.data.area_id = this.data.city[2][this.data.three].area_id
  },

  pickerColumnChange: function (e) {
    console.log(e)
    this.setData({
      column: e.detail.column,
      value: e.detail.value
    })
    if (this.data.column == 0) {
      this.setData({
        one: this.data.value,
        index: [this.data.value, 0, 0],
        two: 0
      })
      this.changeCityList(this)
    } else if (this.data.column == 1) {
      this.setData({
        two: this.data.value
      })
      this.changeCityList(this)
    } else {
      this.setData({
        three: this.data.value
      })
    }


  },
  /**
   * 默认地址选择
   */
  check_default: function () {
    this.setData({
      is_default: !this.data.is_default
    })
  },
  /**
   * 选择地区
   */
  choose_area: function () {
    wx.navigateTo({
      url: '../province_list/province_list',
    })
  },
  /**
   * 输入收货人
   */
  consignee: function (e) {
    this.data.consignee = e.detail.value
  },
  /**
   * 输入联系号码
   */
  contact_num: function (e) {
    this.data.contact_num = e.detail.value
  },
  /**
   * 输入详细地址
   */
  detail_address: function (e) {
    this.data.detail_address = e.detail.value
  },
  /**
   * 保存
   */
  save: function () {
    var that = this
    if (this.data.consignee == '') {
      wx.showToast({ title: '请填写收货人', icon: 'none', duration: 1000, mask: true })
      return
    }
    if (this.data.contact_num == '') {
      wx.showToast({ title: '请填写联系号码', icon: 'none', duration: 1000, mask: true })
      return
    }

    var regBox = {
      regEmail: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,//邮箱  
      regMobile: /^0?1[3|4|5|7|8][0-9]\d{8}$/,//手机
    }
    this.data.contact_num = this.data.contact_num.replace(/[ ]/g, "");   //去掉所有空格  
    var flag = regBox.regMobile.test(this.data.contact_num);
    if (flag) {

    } else {
      wx.showToast({ title: '手机号格式错误', icon: 'none', duration: 1000, mask: true })
      return
    }

    if (this.data.address == '') {
      wx.showToast({ title: '请选择所在地区', icon: 'none', duration: 1000, mask: true })
      return
    }
    if (this.data.detail_address == '') {
      wx.showToast({ title: '请填写详细地址', icon: 'none', duration: 1000, mask: true })
      return
    }
    var status
    if (that.data.is_default) {
      status = 1
    } else {
      status = 2
    }
    var network = require("../../utils/network.js")
    if (this.data.item != '') {
      network.httpPost(app.globalData.member_address_update,
        {
          address: that.data.detail_address,
          area_id: that.data.area_id,
          area_info: that.data.address,
          name: that.data.consignee,
          phone: that.data.contact_num,
          id: that.data.item.id,
          status: status,
          user_id: app.globalData.user_id
        },
        function success(res) {
          wx.navigateBack({
            delta: 1
          })
          wx.showToast({ title: '修改地址成功', icon: 'success', duration: 1000, mask: true })
        })
    } else {
      network.httpPost(app.globalData.member_address_create,
        {
          address: that.data.detail_address,
          area_id: that.data.area_id,
          area_info: that.data.address,
          name: that.data.consignee,
          phone: that.data.contact_num,
          status: status,
          user_id: app.globalData.user_id
        },
        function success(res) {
          try {
            var pages = getCurrentPages()    //获取加载的页面( 页面栈 )
            var prevPage = pages[pages.length - 2]    //获取上一个页面
            // 设置上一个页面的数据（可以修改，也可以新增）
            prevPage.setData({
              is_refresh: true
            })
          } catch (e) { }

          wx.navigateBack({
            delta: 1
          })
          wx.showToast({ title: '保存地址成功', icon: 'success', duration: 1000, mask: true })
        })
    }

  }
})