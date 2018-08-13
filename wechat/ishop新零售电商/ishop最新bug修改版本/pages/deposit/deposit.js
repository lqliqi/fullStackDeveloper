// pages/deposit/deposit.js
var app = getApp()
var network = require("../../utils/network.js")
var event = require('../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否是支付状态
    is_pay: false,
    pay_way: 1,
    money: '',
    account: '',
    balance: '',
    //是否有密码
    pay_pass: '',
    password: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '提现',
    })
    this.setData({
      account: options.phone
    })
    app.globalData.phoneNumber = options.phone
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
    this.getData(this)
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
   * 支付宝
   */
  zfb: function () {
    this.setData({
      pay_way: 1
    })
  },
  /**
   * 微信
   */
  wx: function () {
    this.setData({
      pay_way: 2
    })
  },
  /**
   * 输入的金额
   */
  money: function (e) {
    var value = e.detail.value
    console.log(value)
    if (e.detail.value != '0' && e.detail.value != '.') {
      this.setData({
        money: e.detail.value
      })
    } else {
      this.setData({
        money: ''
      })
    }
  },
  /**
   * 输入的账号
   */
  account: function (e) {
    this.setData({
      account: e.detail.value
    })
  },
  /**
   * 获取余额
   */
  getData: function (that) {
    network.httpGet(app.globalData.my_balance,
      {
        user_id: app.globalData.user_id
      },
      function success(res) {
        that.setData({
          pay_pass: res.data.pay_pass,
          balance: res.data.actual_amount
        })
      })
  },
  /**
   * 提交
   */
  confirm: function () {
    // if (this.data.pay_pass != 1) {
    //   wx.navigateTo({
    //     url: '../set_password/set_password',
    //   })
    //   wx.showToast({ title: '请先设置支付密码', icon: 'none', duration: 1000, mask: true })
    //   return
    // }
    if (this.data.money != '') {
      if (this.data.account != '') {
        // this.setData({
        //   is_pay: true
        // })
        this.deposit(this)
      } else {
        wx.showToast({ title: '请输入微信账号', icon: 'none', duration: 1000, mask: true })
      }
    }
  },
  /**
   * 返回
   */
  back: function () {
    this.setData({
      is_pay: false,
      password: []
    })
  },
  /**
   * 1
   */
  one: function () {
    this.data.password.push(1)
    this.endPassword()
  },
  /**
   * 2
   */
  two: function () {
    this.data.password.push(2)
    this.endPassword()
  },
  /**
   * 3
   */
  three: function () {
    this.data.password.push(3)
    this.endPassword()
  },
  /**
   * 4
   */
  four: function () {
    this.data.password.push(4)
    this.endPassword()
  },
  /**
   * 5
   */
  five: function () {
    this.data.password.push(5)
    this.endPassword()
  },
  /**
   * 6
   */
  six: function () {
    this.data.password.push(6)
    this.endPassword()
  },
  /**
   * 7
   */
  seven: function () {
    this.data.password.push(7)
    this.endPassword()
  },
  /**
   * 8
   */
  eight: function () {
    this.data.password.push(8)
    this.endPassword()
  },
  /**
   * 9
   */
  nine: function () {
    this.data.password.push(9)
    this.endPassword()
  },
  /**
   * 0
   */
  zero: function () {
    this.data.password.push(0)
    this.endPassword()
  },
  /**
   * 删除
   */
  delete: function () {
    this.data.password.pop()
    this.setData({
      password: this.data.password
    })
  },
  /**
   * 密码输入完成
   */
  endPassword: function () {
    var that = this
    this.setData({
      password: this.data.password
    })
    if (this.data.password.length == 6) {
      wx.request({
        url: app.globalData.pay_psw_vertify,
        method: 'POST',
        data: {
          pay_pass: this.data.password.join(''),
          user_id: app.globalData.user_id
        },
        success: function (res) {
          if (res.data.code == 200) {
            that.deposit(that)
          } else {
            that.setData({
              password: []
            })
            wx.showToast({ title: res.data.message, icon: 'none', duration: 1000, mask: true })
          }
        }
      })
    }
  },
  /**
   * 全部提现
   */
  all_withdraw: function () {
    if (this.data.balance == 0.00) {
      wx.showToast({ title: '暂无可提现余额', icon: 'none', duration: 1000, mask: true })
      return
    }
    this.setData({
      money: this.data.balance
    })
  },
  /**
   * 提现
   */
  deposit: function (that) {
    network.httpPost(app.globalData.deposit,
      {
        account: that.data.account,
        name: '',
        price: that.data.money,
        user_id: app.globalData.user_id,
        way: '微信'
      },
      function success(res) {
        wx.redirectTo({
          url: '../deposit_success/deposit_success?money=' + that.data.money,
        })
        event.emit('refresh', '')
      })
  },
  /**
   * 修改密码
   */
  changePsw: function () {
    this.setData({
      is_pay: false
    })
    wx.navigateTo({
      url: '../change_psw/change_psw',
    })
  }
})