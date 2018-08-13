App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  globalData: {
    user_id: '',
    openid: '',
    phoneNumber: '',
    HTTP: 'https://app76.app.longcai.net/',
    //开关
    kaiguan:'https://app76.app.longcai.net/index.php/interfaces/we_chat/fanhui1',
    //登录
    login:'https://app76.app.longcai.net/index.php/interfaces/we_chat/obtain_xiao',
    //首页
    index: 'https://app76.app.longcai.net/index.php/interfaces/index/index',
    //商品详情
    shop_goods: 'https://app76.app.longcai.net/index.php/interfaces/shop_goods/view',
    //品牌街
    brand_list: 'https://app76.app.longcai.net/index.php/interfaces/brand/brand_index',
    //分类索引
    left_list: 'https://app76.app.longcai.net/index.php/interfaces/goods_type/left_list',
    //分类
    right_list: 'https://app76.app.longcai.net/index.php/interfaces/goods_type/right_list',
    //推荐分类
    recommend_list: 'https://app76.app.longcai.net/index.php/interfaces/goods_type/recommend_list',
    //优惠券列表
    coupon_list: 'https://app76.app.longcai.net/index.php/interfaces/coupon/coupon_list',
    //发现好店
    discover_shop_left: 'https://app76.app.longcai.net/index.php/interfaces/discover_shop/type_list',
    //发现好店
    discover_shop: 'https://app76.app.longcai.net/index.php/interfaces/discover_shop/goods_list',
    //限时抢购时间
    flash_sale_time: 'https://app76.app.longcai.net/index.php/interfaces/Limited/ceshi_time',
    //限时抢购商品
    flash_sale_good: 'https://app76.app.longcai.net/index.php/interfaces/Limited/ceshi',
    //商品规格
    goods_attr_gain: 'https://app76.app.longcai.net/index.php/interfaces/shop_goods/attr_gain',
    //商品评价
    goods_evaluate_combo_list: 'https://app76.app.longcai.net/index.php/interfaces/shop_goods_evaluate/combo_list',
    //热门市场
    hot_market: 'https://app76.app.longcai.net/index.php/interfaces/hot_market/market_type',
    //热门市场
    hot_market_list: 'https://app76.app.longcai.net/index.php/interfaces/hot_market/market_list',
    //热点
    hot_spot: 'https://app76.app.longcai.net/index.php/interfaces/promotion/pro_list',
    //店铺分类
    shop_classify: 'https://app76.app.longcai.net/index.php/interfaces/shop/shop_goods_list',
    //店铺详情
    shop_detail: 'https://app76.app.longcai.net/index.php/interfaces/shop/top_find',
    //店铺首页
    shop_index: 'https://app76.app.longcai.net/index.php/interfaces/shop/index_info',
    //全部商品
    shop_good_list: 'https://app76.app.longcai.net/index.php/interfaces/shop/goods_list',
    //上新商品
    shop_new_list: 'https://app76.app.longcai.net/index.php/interfaces/shop/new_list',
    //收藏
    collect_create: 'https://app76.app.longcai.net/index.php/interfaces/member_collect/collect_create',
    //取消收藏
    collect_del: 'https://app76.app.longcai.net/index.php/interfaces/shop/collect_del',
    //领取优惠券
    get_coupon: 'https://app76.app.longcai.net/index.php/interfaces/coupon/get_coupon',
    //签到
    sign: 'https://app76.app.longcai.net/index.php/interfaces/member_sign/create',
    //天天特价
    sale_type: 'https://app76.app.longcai.net/index.php/interfaces/sale/sale_type',
    //天天特价商品
    sale_list: 'https://app76.app.longcai.net/index.php/interfaces/sale/sale_list',
    //积分兑换列表
    integra_list: 'https://app76.app.longcai.net/index.php/interfaces/integral_goods/integral_list',
    //运费
    changefright: 'https://app76.app.longcai.net/index.php/interfaces/shop_goods/charge_freight',
    //商品取消收藏
    good_collect_del: 'https://app76.app.longcai.net/index.php/interfaces/shop_goods/collect_del',
    //我的
    member_my_list: 'https://app76.app.longcai.net/index.php/interfaces/member/my_list',
    //我的订单
    member_order: 'https://app76.app.longcai.net/index.php/interfaces/member_order/my_order',
    //佣金
    commsition_index: 'https://app76.app.longcai.net/index.php/interfaces/member_brokerage/brokerage_index',
    //余额
    my_balance: 'https://app76.app.longcai.net/index.php/interfaces/member/my_balance',
    //佣金明细
    commission_detail: 'https://app76.app.longcai.net/index.php/interfaces/member_brokerage/brokerage_detail',
    //优惠券
    member_coupon: 'https://app76.app.longcai.net/index.php/interfaces/member_coupon/collect_list',
    //红包
    my_pocket: 'https://app76.app.longcai.net/index.php/interfaces/member_packet/collect_list',
    //购物车
    shopping_cart: 'https://app76.app.longcai.net/index.php/interfaces/member_shopping_cart/cart_list',
    //购物车添加商品数量
    cart_reduce: 'https://app76.app.longcai.net/index.php/interfaces/member_shopping_cart/cart_reduce',
    //从购物车中删除
    cart_destory: 'https://app76.app.longcai.net/index.php/interfaces/member_shopping_cart/cart_destroy',
    //购物车猜你喜欢
    cart_guess_you_like: 'https://app76.app.longcai.net/index.php/interfaces/member_shopping_cart/cart_related',
    //购物车选择规格
    cart_attr: 'https://app76.app.longcai.net/index.php/interfaces/member_shopping_cart/cart_attr',
    //购物车更改规格
    cart_update: 'https://app76.app.longcai.net/index.php/interfaces/member_shopping_cart/cart_update',
    //分销商
    my_distribution_list: 'https://app76.app.longcai.net/index.php/interfaces/member_distribution/distribution_member_list',
    //我的收藏
    my_collect_list: 'https://app76.app.longcai.net/index.php/interfaces/member_collect/collect_list',
    //浏览记录
    member_browse_list: 'https://app76.app.longcai.net/index.php/interfaces/member_browse/browse_list',
    //删除浏览记录
    member_browse_del: 'https://app76.app.longcai.net/index.php/interfaces/member_browse/browse_del',
    //服务热线
    service_phone: 'https://app76.app.longcai.net/index.php/interfaces/config/service_phone',
    //我的收货地址
    member_address: 'https://app76.app.longcai.net/index.php/interfaces/member_address/index',
    //设置为默认地址
    member_address_default: 'https://app76.app.longcai.net/index.php/interfaces/member_address/set_default',
    //删除地址
    member_address_destroy: 'https://app76.app.longcai.net/index.php/interfaces/member_address/destroy',
    //获取省份
    area_province_list: 'https://app76.app.longcai.net/index.php/interfaces/area/province_list',
    //获取城市
    area_city_list: 'https://app76.app.longcai.net/index.php/interfaces/area/city_list',
    //获取地区
    area_area_list: 'https://app76.app.longcai.net/index.php/interfaces/area/area_list',
    //添加收货地址
    member_address_create: 'https://app76.app.longcai.net/index.php/interfaces/member_address/create',
    //更新收货地址
    member_address_update: 'https://app76.app.longcai.net/index.php/interfaces/member_address/update',
    //领卷中心列表
    home_coupon_list: 'https://app76.app.longcai.net/index.php/interfaces/coupon/coupon_index',
    //签到首页
    member_sign_index: 'https://app76.app.longcai.net/index.php/interfaces/member_sign/index',
    //领券中心领取优惠券
    coupon_get: 'https://app76.app.longcai.net/index.php/interfaces/coupon/get_coupon',
    //热卖榜
    hot_sale_hot_list: 'https://app76.app.longcai.net/index.php/interfaces/hot_sale/hot_list',
    //热卖榜二级分类
    hot_sale_type_list: 'https://app76.app.longcai.net/index.php/interfaces/hot_sale/type_list',
    //热卖榜列表
    hot_sale_goods_list: 'https://app76.app.longcai.net/index.php/interfaces/hot_sale/goods_list',
    //我的取消收藏
    member_collect_del: 'https://app76.app.longcai.net/index.php/interfaces/member_collect/collect_del',
    //兑换记录
    integral_history: 'https://app76.app.longcai.net/index.php/interfaces/integral_goods/goods_list',
    //积分详情
    integral_details_list: 'https://app76.app.longcai.net/index.php/interfaces/integral_goods/integral_detail',
    //物流详情
    logistics_detail: 'https://app76.app.longcai.net/index.php/interfaces/member_order/express_view',
    //积分兑换 确认收货
    confirm_receipt: 'https://app76.app.longcai.net/index.php/interfaces/integral_goods/confirm_order',
    //积分兑换商品
    integral_conversion: 'https://app76.app.longcai.net/index.php/interfaces/integral_goods/integral_conversion',
    //收货地址列表
    member_address_index: 'https://app76.app.longcai.net/index.php/interfaces/member_address/index',
    //反馈问题列表
    feedback_list: 'https://app76.app.longcai.net/index.php/interfaces/feedback/feedback_list',
    //意见反馈
    feedback_create: 'https://app76.app.longcai.net/index.php/interfaces/feedback/feedback_create',
    //加入购物车
    member_shopping_cart_create: 'https://app76.app.longcai.net/index.php/interfaces/member_shopping_cart/cart_create',
    //搜索后商品列表
    shop_goods_list: 'https://app76.app.longcai.net/index.php/interfaces/shop_goods/goods_list',
    //热门搜索
    search_hot: 'https://app76.app.longcai.net/index.php/interfaces/search/hot',
    //店铺列表
    shop_shop_list: 'https://app76.app.longcai.net/index.php/interfaces/shop/shop_list',
    //消息列表
    message_list: 'https://app76.app.longcai.net/index.php/interfaces/member_message/message_list',
    //店铺优惠券
    member_order_coupon_list: 'https://app76.app.longcai.net/index.php/interfaces/member_order/coupon_list',
    //使用红包列表
    member_order_redpacket_list: 'https://app76.app.longcai.net/index.php/interfaces/member_order/red_packet_list',
    //生成订单
    member_order_generating_order: 'https://app76.app.longcai.net/index.php/interfaces/member_order/generating_order_weixin',
    //取消订单
    member_order_cancel: 'https://app76.app.longcai.net/index.php/interfaces/member_order/order_cancel',
    //购物车购买
    member_order_affirm: 'https://app76.app.longcai.net/index.php/interfaces/member_order/order_affirm',
    //验证支付密码
    pay_psw_vertify: 'https://app76.app.longcai.net/index.php/interfaces/member/payment_code',
    //佣金提现
    deposit: 'https://app76.app.longcai.net/index.php/interfaces/member_brokerage/withdraw',
    //设置支付密码
    pay_psw_create: 'https://app76.app.longcai.net/index.php/interfaces/member/create_payment_code',
    //重置支付密码
    update_pay_psw: 'https://app76.app.longcai.net/index.php/interfaces/member/update_payment_code',
    //优惠套餐
    shop_goods_combo_list: 'https://app76.app.longcai.net/index.php/interfaces/shop_goods/combo_list',
    //退换货
    member_order_refund: 'https://app76.app.longcai.net/index.php/interfaces/member_order/order_refund',
    //上传图片
    upload_image: 'https://app76.app.longcai.net/index.php/interfaces/shop_goods_evaluate/upload_pictures',
    //确认收货
    member_order_confirm: 'https://app76.app.longcai.net/index.php/interfaces/member_order/order_confirm',
    //退款详情
    member_order_refund_detail: 'https://app76.app.longcai.net/index.php/interfaces/member_order/order_refund_view',
    //物流公司
    express_list: 'https://app76.app.longcai.net/index.php/interfaces/member_order/logistics',
    //退货物流
    refund_commit: 'https://app76.app.longcai.net/index.php/interfaces/member_order/order_refund_number',
    //商品详情
    member_order_detail: 'https://app76.app.longcai.net/index.php/interfaces/member_order/order_view',
    //商品评论
    shop_goods_evaluate: 'https://app76.app.longcai.net/index.php/interfaces/shop_goods_evaluate/goods_evaluate',
    //获取地址
    member_address_obtain: 'https://app76.app.longcai.net/index.php/interfaces/member_address/obtain',
    //抽奖记录
    my_lottery: 'https://app76.app.longcai.net/index.php/interfaces/draw/order_list',
    //抽奖确认收货
    confirm_lottery: 'https://app76.app.longcai.net/index.php/interfaces/draw/confirmation',
    //领取抽奖
    confirm_lottery_context: 'https://app76.app.longcai.net/index.php/interfaces/draw/generating_order',
    //分销订单
    member_distribution_order_list: 'https://app76.app.longcai.net/index.php/interfaces/member_distribution/distribution_order_list',
    //我的拍卖列表
    member_auction_order: 'https://app76.app.longcai.net/index.php/interfaces/auction/order_list',
    //正在拍卖
    member_aucting_order: 'https://app76.app.longcai.net/index.php/interfaces/auction/order_selling',
    //我的拍卖确认收货
    confirm_get_goods: 'https://app76.app.longcai.net/index.php/interfaces/auction/confirmation',
    //抽奖
    lucky_draw: 'https://app76.app.longcai.net/index.php/interfaces/draw/index',
    //拍卖
    auction_web: 'https://app76.app.longcai.net/index.php/interfaces/auction/index',
    //拍卖现场
    auction_scence: 'https://app76.app.longcai.net/index.php/interfaces/auction/spot?user_id=',
    //商品介绍
    good_introduction: 'https://app76.app.longcai.net/index.php/interfaces/config/goods_view',
    //规格参数
    good_specification: 'https://app76.app.longcai.net/index.php/interfaces/config/goods_spec',
    //预支付
    prepayment: 'https://app76.app.longcai.net/index.php/interfaces/Wx_xchen/notifyurl',
    //支付完成回调
    pay_finish: 'https://app76.app.longcai.net/index.php/mobile/Wx_action1/notifyurl',
    //通知消息详情
    message_detail: 'https://app76.app.longcai.net/index.php/interfaces/member_message/detail?message_id=',
    //热点详情
    promotion_detail: 'https://app76.app.longcai.net/index.php/interfaces/config/promotion_view?id=',
    //我的二维码
    my_scan: 'https://app76.app.longcai.net/index.php/mobile/scan_code/qrcode_xiao?uid=',
    //我的手机号
    my_phone: 'https://app76.app.longcai.net/index.php/interfaces/we_chat/obtain_decode',
    //商家入驻
    merchant: 'https://app76.app.longcai.net/index.php/interfaces/member_message/merchants',
    //banner详情介绍
    detail_web: 'https://app76.app.longcai.net/index.php/interfaces/config/info_view?id=',
    //生成拍卖保证金订单号
    auction_create_order: 'https://app76.app.longcai.net/index.php/interfaces/wx_xchen/createNumber_xiao',
    //拍卖订单地址
    auction_order_address: 'https://app76.app.longcai.net/index.php/interfaces/auction/auction_order_dizhi'
  }
})