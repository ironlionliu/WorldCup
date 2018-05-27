//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello WorldCup, code changed',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    saveImage: null,
    getRequest: 'before'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log("onload")
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.drawCanvas(this.data.userInfo.avatarUrl,'userinfo-avatar1')
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.drawCanvas(this.data.userInfo.avatarUrl,'userinfo-avatar1')
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.drawCanvas(this.data.userInfo.avatarUrl,'userinfo-avatar1')
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.drawCanvas(this.data.userInfo.avatarUrl,'userinfo-avatar1')
  },
  drawCanvas: function (url,id) {
    let context = wx.createCanvasContext(id)
    console.log(url)
    // context.drawImage(url, 0, 0, 300, 300)
    // // userInfo.avatarUrl
    // context.draw()
    // context.setFillStyle('red')
    // context.fillRect(10, 10, 150, 75)
    // context.draw(true, res => {
    //   console.log("request")
    //   this.setData({
    //     getRequest: "after"
    //   })
    //   // this.saveCanvas()
    // })
    let tempPath = wx.downloadFile({
      url: url,
      success: res => {
        context.drawImage(res.tempFilePath, 0, 0, 300, 300)
        context.draw()
        context.setFillStyle('red')
        context.fillRect(10, 10, 150, 75)
        context.draw(true, res => {
          console.log("request")
          this.setData({
            getRequest: "after"
          })
          // this.saveCanvas()
        })
      }
    })
    
  },
  saveCanvas: function(e) {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 300,
      height: 300,
      destWidth: 300,
      destHeight: 300,
      canvasId: 'userinfo-avatar1',
      success: res => {
        console.log(res.tempFilePath)
        this.setData({
          saveImage: res.tempFilePath
        })
      }
    })
  }
})
