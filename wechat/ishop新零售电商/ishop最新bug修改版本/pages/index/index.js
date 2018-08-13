//index.js
var app = getApp()
var network = require("../../utils/network.js")
Page({
  data: {
    hidden: true,
    banner_list: [],
    pro_list: [],
    pic1: '',
    pic2: '',
    pic3: '',
    clock: '',
    hot_list: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    leftTime: 0,
    //倒计时
    count_down: '',
    d: '',
    h: '',
    m: '',
    s: '',
    title: [],
    hot_sales: [],
    type_list: [],
    shop_list: [],
    like_list: [],
    //上级id
    s_id: 0
  },

  /**
   * 倒计时
   */
  countdown: function (that) {
    clearTimeout(that.data.count_down)
    var total_micro_second = that.data.leftTime || [];
    that.dateformat(total_micro_second)
    if (total_micro_second <= 0) {
      that.setData({
        clock: "已经截止"
      });
      that.getData(that)
      //return;
    } else {
      that.data.count_down = setTimeout(function () {
        total_micro_second -= 1;
        that.data.leftTime -= 1;
        that.countdown(that);
      }, 1000)
    }
  },

  // 时间格式化输出，如11:03 25:19 每1s都会调用一次
  dateformat: function (micro_second) {
    // 总秒数
    var second = Math.floor(micro_second);
    // 天数
    var day = Math.floor(second / 3600 / 24);
    // 小时
    var hr = Math.floor(second / 3600 % 24);
    // 分钟
    var min = Math.floor(second / 60 % 60);
    // 秒
    var sec = Math.floor(second % 60);

    this.setData({
      d: day,
      h: hr,
      m: min,
      s: sec
    })
    return day + "天" + hr + "小时" + min + "分钟" + sec + "秒";
  },

  onLoad: function (options) {
    var that = this;
    this.kaiguan()
    wx.setNavigationBarTitle({
      title: '首页',
    });

    //分销下级
    if (options.user_id != undefined) {
      this.data.s_id = options.user_id
    }
    if (options.scene != undefined) {
      this.data.s_id = decodeURIComponent(options.scene)
    }
    // this.getData(this)
  },


  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {
    var that = this
    // wx.showLoading({
    //   title: '加载中...',
    // })

    wx.getSetting({
      success: function (res) {
        console.log(res)
        if (res.authSetting['scope.userInfo'] == undefined || !res.authSetting['scope.userInfo']) {
          that.setData({
            sq: true
          })
        } else {
          wx.login({
            success: function (ress) {
              wx.getUserInfo({
                success: function (res) {
                  console.log(res)
                  network.httpGet(app.globalData.login,
                    {
                      code: ress.code,
                      encryptedData: res.encryptedData,
                      iv: res.iv,
                      avatarUrl: res.userInfo.avatarUrl,
                      s_id: that.data.s_id
                    },
                    function success(res) {
                      console.log(res)
                      app.globalData.user_id = res.data.user_id
                      app.globalData.openid = res.data.openid
                      that.getData(that)
                    })
                },
                fail: function () {
                  wx.hideLoading()
                  that.openSetting()
                  wx.showToast({ title: '请将用户信息授权打开', icon: 'none', duration: 1000, mask: true })
                }
              })
            }
          })
        }
      }
    })
  },

  /**
   * 打开设置
   */
  openSetting: function () {
    var that = this
    wx.openSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.login({
            success: function (res1) {
              wx.getUserInfo({
                success: function (res) {
                  network.httpGet(app.globalData.login,
                    {
                      code: res1.code,
                      encryptedData: res.encryptedData,
                      iv: res.iv,
                      avatarUrl: res.rawData.avatarUrl,
                      s_id: that.data.s_id
                    },
                    function success(res) {
                      app.globalData.user_id = res.data.user_id
                      app.globalData.openid = res.data.openid
                      that.getData(that)
                    })
                },
                fail: function () {
                  that.openSetting()
                }
              })
            }
          })
        } else {
          that.openSetting()
        }
      }
    })
  },

  /**
   * 获取用户信息
   */
  getUserInfo: function (e) {
    console.log(e)
    var that = this
    if (e.detail.rawData == undefined) {
      this.setData({
        sq: true
      })
    } else {
      this.setData({
        sq: false
      })
      wx.login({
        success: function (ress) {
          wx.getUserInfo({
            success: function (res) {
              network.httpGet(app.globalData.login,
                {
                  code: ress.code,
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                  avatarUrl: res.userInfo.avatarUrl,
                  s_id: that.data.s_id
                },
                function success(res) {
                  app.globalData.user_id = res.data.user_id
                  app.globalData.openid = res.data.openid
                  that.getData(that)
                })
            },

          })
        }
      })
    }
  },

  onPullDownRefresh: function () {
    this.getData(this)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 
   */
  enter: function (e) {
    switch (e.currentTarget.dataset.id) {
      //签到
      case 1:
        wx.navigateTo({
          url: '../sign_in/sign_in',
        })
        break;
      //抽奖
      case 2:
        wx.navigateTo({
          url: '../lucky_draw/lucky_draw',
        })
        break;
      //拍卖
      case 3:
        wx.navigateTo({
          url: '../auction_web/auction_web',
        })
        break;
      //领券中心
      case 4:
        wx.navigateTo({
          url: '../coupon_centre/coupon_centre',
        })
        break;
      //红包
      case 5:
        wx.navigateTo({
          url: '../redpocket/redpocket',
        })
        break;
      //推广
      case 6:
        wx.navigateTo({
          url: '../my_qrcode/my_qrcode',
        })
        break;
      //佣金
      case 7:
        wx.navigateTo({
          url: '../commission/commission',
        })
        break;
      //分销商
      case 8:
        wx.navigateTo({
          url: '../distributor/distributor',
        })
        break;
      //积分商城
      case 9:
        wx.navigateTo({
          url: '../integral/integral',
        })
        break;
      //商家入驻
      case 10:
        wx.navigateTo({
          url: '../merchant_web/merchant_web',
        })
        break;
      //钱包
      case 11:
        wx.navigateTo({
          url: '../my_wallet/my_wallet',
        })
        break;
      //店铺街
      case 12:
        wx.navigateTo({
          url: '../find_shop/find_shop',
        })
        break;
    }
  },
  /**
   * 点击banner
   */
  banner: function (e) {
    var item = e.currentTarget.dataset.item
    if (item.skip_type == 'goods') {
      wx.navigateTo({
        url: '../good_detail/good_detail?id=' + item.linkUrl,
      })
    } else if (item.skip_type == 'shop') {
      wx.navigateTo({
        url: '../shop_details/shop_details?shop_id=' + item.linkUrl,
      })
    } else {
      wx.navigateTo({
        url: '../detail_web/detail_web?id=' + item.linkUrl,
      })
    }
  },
  /**
   * 热点详情
   */
  hotspotDetail: function (e) {
    var item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../hotspot_detail_web/hotspot_detail_web?id=' + item.id + '&title=' + item.title,
    })
  },
  /**
   * 获取数据
   */
  getData: function (that) {
    network.httpGet(app.globalData.index, '', function success(res) {
      that.setData({
        clock: res.ceshi_title,
        banner_list: res.banner_list,
        pro_list: res.pro_list,
        hot_sales: res.limited_list.data,
        hot_list: res.hot_list,
        type_list: res.type_list,
        shop_list: res.shop_list,
        like_list: res.like_list,
        leftTime: res.end_time
      })
      that.countdown(that)
    })


  },

  /**
   * 开关
   */
  kaiguan: function () {
    var that = this
    wx.request({
      url: app.globalData.kaiguan,
      success:function(res){
        console.log(res.data.code)
        if (res.data.code == 200) {
          console.log('res')
          that.setData({
            title: [[{ id: 1, name: '签到', url: '/images/index/i_icon1.png' }, { id: 2, name: '抽奖', url: '/images/index/i_icon2.png' }, { id: 3, name: '拍卖', url: '/images/index/i_icon3.png' }, { id: 4, name: '领券中心', url: '/images/index/i_icon4.png' }, { id: 11, name: '钱包', url: '/images/index/i_icon11.png' }, { id: 6, name: '推广', url: '/images/index/i_icon6.png' }, { id: 7, name: '佣金', url: '/images/index/i_icon7.png' }, { id: 8, name: '分销商', url: '/images/index/i_icon8.png' }, { id: 9, name: '积分商城', url: '/images/index/i_icon9.png' }, { id: 10, name: '商家入驻', url: '/images/index/i_icon10.png' }], [{ id: 12, name: '店铺街', url: '/images/index/i_icon12.png' }]],
          })
        } else {
          that.setData({
            title: [[{ id: 1, name: '签到', url: '/images/index/i_icon1.png' }, { id: 2, name: '抽奖', url: '/images/index/i_icon2.png' }, { id: 3, name: '拍卖', url: '/images/index/i_icon3.png' }, { id: 4, name: '领券中心', url: '/images/index/i_icon4.png' }, { id: 11, name: '钱包', url: '/images/index/i_icon11.png' }, { id: 6, name: '推广', url: '/images/index/i_icon6.png' }, { id: 7, name: '佣金', url: '/images/index/i_icon7.png' }, { id: 8, name: '分销商', url: '/images/index/i_icon8.png' }, { id: 9, name: '积分商城', url: '/images/index/i_icon9.png' }]],
          })
        }
      }
    })
  }
})
