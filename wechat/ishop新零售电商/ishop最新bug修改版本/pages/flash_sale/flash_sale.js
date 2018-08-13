// pages/flash_sale/flash_sale.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentNavtab: 0,
    flash_sale_time: [],
    hidden: true,
    flash_sale_good: [],
    page: 1,
    type_id: '',
    start: true,
    //倒计时提示语
    block: '',
    time_content: '',
    //倒计时
    leftTime: 0,
    count_down: '',
    d: '',
    h: '',
    m: '',
    s: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '限时抢购',
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
    this.setData({
      flash_sale_time: [],
      flash_sale_good: []
    })
    this.data.page = 1;
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
  /**
   * 切换选项卡
   */
  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
    this.data.type_id = e.currentTarget.dataset.type
    this.data.page = 1
    this.getData(this)
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
   * 网络请求
   */
  getData: function (that) {
    that.changeHidden();
    wx.request({
      url: app.globalData.flash_sale_time,
      success: function (res) {
        that.setData({
          flash_sale_time: res.data.data
        })
        if (that.data.type_id == '') {
          that.data.type_id = that.data.flash_sale_time[0].id
        }
        if (that.data.type_id == that.data.flash_sale_time[0].id) {
          that.setData({
            start: true,
            block: '抢购中,先下单先得哦',
            time_content: '距离结束'
          })
        } else {
          that.setData({
            start: false,
            block: '抢购即将开始',
            time_content: '距离开始'
          })
        }
        wx.request({
          url: app.globalData.flash_sale_good,
          data: {
            type_id: that.data.type_id,
            page: that.data.page
          },
          success: function (res) {
            console.log(res)
            wx.stopPullDownRefresh();
            that.changeHidden();
            if (that.data.page == 1) {
              that.setData({
                flash_sale_good: res.data.data.data,
                leftTime: res.data.limit_time
              })
              that.countdown(that)
            } else {
              that.setData({
                flash_sale_good: that.data.flash_sale_good.concat(res.data.data.data)
              })
            }
          }
        })
      }
    })
  },
  /**
   * 立即抢购
   */
  go_rush: function (e) {
    if (this.data.currentNavtab == 0) {
      wx.navigateTo({
        url: '../good_detail/good_detail?is_rush=1&id=' + e.currentTarget.dataset.id
      })
    }
  }
})