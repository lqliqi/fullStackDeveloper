Page({

    data: {
        objectArr: ['烫伤', '发烧', '牙疼', '扭伤', '腹痛', '癫痫', '食物中毒', '煤气中毒', '酒精中毒', '中暑', '流鼻血', '昏迷', '窒息', '蜜蜂蛰伤', '抽筋', '触电', '宠物咬伤', '人工呼吸', '骨折', '溺水', '烧伤', '异物入眼', '出血', '服错药', '呼吸困难', '急性肺炎', '木刺', '脑溢血', '神经衰弱', '失血休克', '手指切断', '手指切伤', '头部受伤', '头痛', '突发耳聋', '胃穿孔', '胃痉挛', '心绞痛', '心脏骤停', '异物卡喉', '鱼骨刺喉', '炸伤', '指甲受挫', '中风'],
        lidTit:'免责申明',
        lidText:'本功能提供内容仅供参考，内容来源于百科常识，如发生重大紧急性疾病问题，请尽快拨打急救电话120，尽早就医！'
    },
    goNext: function (event) {
        var id = event.currentTarget;
        console.log(id);
        // wx.navigateTo({
        //     url: '../information/information?id=' + id,
        // })
    },
    onLoad: function(options){
    },

    closeLid: function(){
      var that = this;
      that.setData({
        lidTip: true,
        contentTip: true
      })
    },
    blockLid: function(){
      var that = this;
      that.setData({
        lidTip: false,
        contentTip: false
      })
    }
})