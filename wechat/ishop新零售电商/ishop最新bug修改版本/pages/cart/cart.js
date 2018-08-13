var app = getApp()
var event = require('../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    able: true,
    hidden: true,
    //是否是编辑
    edit: true,
    //购物车列表
    cart_list: [],
    //被选中的商品id
    goods_id: '',
    //被选中的商品购物车id
    cart_id: '',
    //店铺选中
    shop_is_check: [],
    //商品选中
    is_check: [],
    //全选
    all_check: false,
    //合计
    sum: 0,
    //数量
    num: 0,
    //猜你喜欢
    like_list: [],
    //当前商品
    good_detail: {},
    //当前商品价格
    buying_price: '',
    //选中的规格
    size_array: [],
    size: '',
    //商品规格
    goods_attr: [],
    //当前选中的数量
    quantity: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '购物车',
    })
    this.getCartData(this)
    this.guessYouLike(this)
    //更新购物车信息
    event.on('refresh_cart', this, function () {
      this.refresh()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.refresh()
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
    event.remove('refresh_cart', this);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.refresh()
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
   * 加载框的显示
   */
  changeHidden: function () {
    this.setData({
      hidden: !this.data.hidden
    });
  },
  /**
   * 点击切换
   */
  edit: function () {
    this.setData({
      edit: !this.data.edit,
    })
  },
  /**
   * 购物车
   */
  getCartData: function (that) {
    that.changeHidden()
    wx.request({
      url: app.globalData.shopping_cart,
      data: {
        user_id: app.globalData.user_id
      },
      success: function (res) {
        that.changeHidden()
        wx.stopPullDownRefresh()
        that.setData({
          cart_list: res.data.data
        })
        that.data.shop_is_check = []
        that.data.is_check = []
        //是否选中
        for (var i = 0; i < res.data.data.length; i++) {
          that.data.shop_is_check.push(false)
          var second_array = new Array(res.data.data[i].list.length)
          for (var j = 0; j < res.data.data[i].list.length; j++) {
            second_array[j] = false;
          }
          that.data.is_check.push(second_array)
        }
        that.setData({
          shop_is_check: that.data.shop_is_check,
          is_check: that.data.is_check
        })
      }
    })
  },
  /**
   * 购物车增加数量
   */
  add: function (e) {
    var that = this
    that.changeHidden()
    wx.request({
      url: app.globalData.cart_reduce,
      data: {
        id: e.currentTarget.dataset.item.cart_id,
        type: 1,
        number: 1
      },
      success: function (res) {
        that.changeHidden()
        if (res.data.code == 200) {
          for (var i = 0; i < that.data.cart_list.length; i++) {
            for (var j = 0; j < that.data.cart_list[i].list.length; j++) {
              if (e.currentTarget.dataset.item.cart_id == that.data.cart_list[i].list[j].cart_id) {
                that.data.cart_list[i].list[j].number++
              }
            }
          }
          that.setData({
            cart_list: that.data.cart_list
          })
          that.calculate()
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      }
    })
  },
  /**
   * 购物车减少数量
   */
  reduce: function (e) {
    var that = this
    that.changeHidden()
    wx.request({
      url: app.globalData.cart_reduce,
      data: {
        id: e.currentTarget.dataset.item.cart_id,
        type: 2,
        number: 1
      },
      success: function (res) {
        that.changeHidden()
        for (var i = 0; i < that.data.cart_list.length; i++) {
          for (var j = 0; j < that.data.cart_list[i].list.length; j++) {
            if (e.currentTarget.dataset.item.cart_id == that.data.cart_list[i].list[j].cart_id) {
              that.data.cart_list[i].list[j].number--
            }
          }
        }
        that.setData({
          cart_list: that.data.cart_list
        })
        that.calculate()
      }
    })
  },
  /**
   * 选中店铺
   */
  shop_check: function (e) {
    var index = e.currentTarget.dataset.index
    this.data.shop_is_check[index] = !this.data.shop_is_check[index]
    for (var i = 0; i < this.data.is_check[index].length; i++) {
      if (this.data.shop_is_check[index]) {
        this.data.is_check[index][i] = true

      } else {
        this.data.is_check[index][i] = false
      }
    }
    this.setData({
      shop_is_check: this.data.shop_is_check,
      is_check: this.data.is_check
    })
    //判断是否全选
    var check = this.data.shop_is_check[0]
    for (var i = 0; i < this.data.shop_is_check.length; i++) {
      check = check && this.data.shop_is_check[i]
    }
    this.setData({
      all_check: check
    })
    this.calculate()
  },
  /**
   * 选中商品
   */
  check: function (e) {
    //第一层
    var first = e.currentTarget.dataset.index
    //第二层
    var second = e.currentTarget.dataset.idx
    this.data.is_check[first][second] = !this.data.is_check[first][second]
    this.setData({
      is_check: this.data.is_check
    })
    var shop_check = this.data.is_check[first][0]
    for (var i = 0; i < this.data.is_check[first].length; i++) {
      shop_check = this.data.is_check[first][i] && shop_check
    }
    this.data.shop_is_check[first] = shop_check
    this.setData({
      shop_is_check: this.data.shop_is_check
    })
    //判断是否全选
    var check = this.data.shop_is_check[0]
    for (var i = 0; i < this.data.shop_is_check.length; i++) {
      check = check && this.data.shop_is_check[i]
    }
    this.setData({
      all_check: check
    })
    this.calculate()
  },
  /**
   * 全选
   */
  select_all: function () {
    this.setData({
      all_check: !this.data.all_check
    })
    //全选
    if (this.data.all_check) {
      //全选店铺
      for (var i = 0; i < this.data.shop_is_check.length; i++) {
        this.data.shop_is_check[i] = true
      }
      //全选商品
      for (var i = 0; i < this.data.shop_is_check.length; i++) {
        for (var j = 0; j < this.data.is_check[i].length; j++) {
          this.data.is_check[i][j] = true
        }
      }
    } else {
      //全部取消
      //全选取消店铺
      for (var i = 0; i < this.data.shop_is_check.length; i++) {
        this.data.shop_is_check[i] = false
      }
      //全选取消商品
      for (var i = 0; i < this.data.shop_is_check.length; i++) {
        for (var j = 0; j < this.data.is_check[i].length; j++) {
          this.data.is_check[i][j] = false
        }
      }
    }
    this.setData({
      shop_is_check: this.data.shop_is_check,
      is_check: this.data.is_check
    })
    this.calculate()
  },
  /**
   * 计算价格
   */
  calculate: function () {
    var sum = 0
    var num = 0
    for (var i = 0; i < this.data.shop_is_check.length; i++) {
      for (var j = 0; j < this.data.is_check[i].length; j++) {
        if (this.data.is_check[i][j]) {
          sum += this.data.cart_list[i].list[j].price * this.data.cart_list[i].list[j].number
          num += this.data.cart_list[i].list[j].number
        }
      }
    }
    this.setData({
      sum: sum.toFixed(2),
      num: num
    })
  },
  /**
   * 删除商品
   */
  destory: function () {
    var that = this
    var id = ''
    for (var i = 0; i < that.data.shop_is_check.length; i++) {
      for (var j = 0; j < that.data.is_check[i].length; j++) {
        if (that.data.is_check[i][j]) {
          id += that.data.cart_list[i].list[j].cart_id + ','
        }
      }
    }
    console.log(id.length)
    if (id.length==0){
      wx.showToast({ title: '请选择商品', icon: 'none', duration: 1000, mask: true })
      return
    }
    that.changeHidden()
    wx.request({
      url: app.globalData.cart_destory,
      data: {
        id: id
      },
      success: function (res) {
        that.changeHidden()
        wx.showToast({ title: '删除成功', icon: 'success', duration: 1000, mask: true })
        that.setData({
          edit: !that.data.edit
        })
        that.refresh()
      }
    })

  },
  /**
   * 购物车猜你喜欢
   */
  guessYouLike: function (that) {
    that.changeHidden()
    wx.request({
      url: app.globalData.cart_guess_you_like,
      data: {
        user_id: app.globalData.user_id
      },
      success: function (res) {
        that.changeHidden()
        that.setData({
          like_list: res.data.data
        })
      }
    })
  },
  /**
   * 刷新购物车
   */
  refresh: function () {
    for (var i = 0; i < this.data.shop_is_check.length; i++) {
      this.data.shop_is_check[i] = false
      for (var j = 0; j < this.data.is_check[i].length; j++) {
        this.data.is_check[i][j] = false
      }
    }
    this.setData({
      shop_is_check: this.data.shop_is_check,
      is_check: this.data.is_check,
      all_check: false
    })
    this.getCartData(this)
    this.guessYouLike(this)
    this.calculate()
  },
  /**
   * 弹出选择规格窗口
   */
  showChooseSize: function (e) {
    var that = this
    var item = e.currentTarget.dataset.item
    this.setData({
      good_detail: item,
      buying_price: item.price,
      size: item.attr,
      quantity: item.number,
      able: !that.data.able
    })
    wx.request({
      url: app.globalData.cart_attr,
      data: {
        id: item.goods_id
      },
      success: function (res) {
        that.setData({
          goods_attr: res.data.data.goods_attr
        })
        var sizes = item.attr.split(',')
        that.data.size_array = new Array(res.data.data.goods_attr.length)
        for (var i = 0; i < that.data.size_array.length; i++) {
          that.data.size_array[i] = sizes[i]
        }
        that.setData({
          size_array: that.data.size_array
        })
      }
    })
  },
  /**
   * 选择规格
   */
  chooseSize: function (e) {
    var that = this
    that.changeHidden()
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
    wx.request({
      url: app.globalData.goods_attr_gain,
      data: {
        goods_id: that.data.good_id,
        attr: that.data.size
      },
      success: function (res) {
        that.changeHidden()
        if (res.data.data != null) {
          that.setData({
            buying_price: res.data.data.price,
            inventory: res.data.data.inventory
          })
          if (that.data.quantity > that.data.inventory) {
            that.setData({
              quantity: that.data.inventory
            })
          }
        }
      }
    })
  },
  /**
   * 确定
   */
  commit: function () {
    var that = this
    for (var i = 0; i < this.data.size_array.length; i++) {
      if (this.data.size_array[i] == '') {
        wx.showToast({ title: '请选择规格', icon: 'none', duration: 1000, mask: true })
        return
      }
    }
    wx.request({
      url: app.globalData.cart_update,
      data: {
        attr: that.data.size,
        cart_id: that.data.good_detail.cart_id,
        id: that.data.good_detail.goods_id,
        number: that.data.quantity,
        user_id: app.globalData.user_id
      },
      success: function (res) {
        if (res.data.code == 200) {
          //更新数据
          that.data.good_detail.attr = that.data.size
          that.data.good_detail.number = that.data.quantity
          for (var i = 0; i < that.data.cart_list.length; i++) {
            for (var j = 0; j < that.data.cart_list[i].list.length; j++) {
              if (that.data.cart_list[i].list[j].cart_id == that.data.good_detail.cart_id) {
                that.data.cart_list[i].list[j] = that.data.good_detail
              }
            }
          }
          that.setData({
            able: !that.data.able,
            cart_list: that.data.cart_list
          })
          wx.showToast({
            title: '修改成功',
          })
          that.calculate()
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      }
    })
  },
  /**
   * 选择规格减少数量
   */
  quantity_reduce: function () {
    if (this.data.quantity == 1) {
      return
    }
    this.data.quantity--
    this.setData({
      quantity: this.data.quantity
    })
    this.calculate()
  },
  /**
   * 选择规格增加数量
   */
  quantity_increase: function () {
    this.data.quantity++
    this.setData({
      quantity: this.data.quantity
    })
    this.calculate()
  },
  /**
   * 关闭选择窗口
   */
  close: function () {
    this.setData({
      able: !this.data.able
    })
  },

  /**
   * 结算
   */
  accounts: function () {
    this.data.goods_id = ''
    this.data.cart_id = ''
    console.log(this.data.is_check.length)
    for (var i = 0; i < this.data.is_check.length; i++) {
      for (var j = 0; j < this.data.is_check[i].length; j++) {
        if (this.data.is_check[i][j]) {
          this.data.goods_id += this.data.cart_list[i].list[j].goods_id + ','
          this.data.cart_id += this.data.cart_list[i].list[j].cart_id + ','
        }
      }
    }
    if (this.data.goods_id != '') {
      wx.navigateTo({
        url: '../cart_confirm_order/cart_confirm_order?goods_id=' + this.data.goods_id + '&cart_id=' + this.data.cart_id,
      })
    } else {
      wx.showToast({ title: '请选择商品', icon: 'none' })
    }
  }
})