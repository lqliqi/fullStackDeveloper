function httpGet(url, params, success) {
  wx.showLoading({
    title: '加载中...',
  })
  wx.request({
    url: url,
    data: params,

    success: function (res) {
      //console.log(res.data)
      wx.hideLoading()
      wx.stopPullDownRefresh()
      if (res.data.code == 200 | res.data.status == 200) {
        success(res.data)
      } else {
        wx.showToast({ title: res.data.message, icon: 'none', duration: 1000, mask: true })
      }

    },
    fail: function (res) {
      wx.hideLoading()
      wx.showToast({ title: res.data.message, icon: 'none', duration: 1000, mask: true })
      // fail()
    },
    complete: function (res) {

    },
  })
}

function httpPost(url, params, success) {
  // console.log(params)
  wx.showLoading({
    title: '加载中...',
  })
  wx.request({
    url: url,
    data: params,
    method: 'POST',
    success: function (res) {
      console.log(res.data)
      wx.stopPullDownRefresh()
      wx.hideLoading()
      if (res.data.code == 200 | res.data.status == 200) {
        success(res.data)
      } else {
        wx.showToast({ title: res.data.message, icon: 'none', duration: 1000, mask: true })
      }

    },
    fail: function (res) {
      console.log(res)
      wx.hideLoading()
      wx.showToast({ title: res.data.message, icon: 'none', duration: 1000, mask: true })
      // fail()
    },
    complete: function (res) {

    },
  })
}

module.exports = {
  httpGet: httpGet,
  httpPost: httpPost
}
