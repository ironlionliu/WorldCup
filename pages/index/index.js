//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    footballClass: 'football-vibrate',
  },

  //这是一个网络请求
  getUserInfo: function(e) {
    console.log(e)
    if(e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        footballClass: 'football-shoot'
      })
    }else {
      console.log(e.detail.errMsg)
    }
  },

  //跳转页面
  navigateToAvatar: function(e) {
    wx.navigateTo({
      url: '../avatar/index',
      success: () => {
        console.log('跳转成功！')
      }
    })
  }
})