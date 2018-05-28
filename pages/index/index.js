//index.js
//获取应用实例
const app = getApp()

let icons = {
  cup: [{
    id: '',
    name: '',
    cupPath: '../../images/cup/cup.gif'
  }],
  football: [{
    id: '',
    name: '',
    footballPath: '../../images/football/football.jpeg'
  }],
  mascot: [{
    id: '',
    name: '',
    mascotPath: '../../images/mascot/mascot.jpeg'
  }],
  nations: [{
    id: '',
    name: '',
    emblemPath: '../../images/nations/Brazil_emblem.jpeg',
    flagPath: '../../images/nations/Brazil_flag.jpeg'
  }],
  others: [{
    id: '',
    name: '',
    othersPath: 'others'
  }]
}
let tagList = ['cup','football','mascot','emblem','flag','others']

Page({
  data: {
    motto: 'Hello WorldCup, code changed',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    saveImage: null,
    getRequest: 'before',
    tagList: tagList,
    showIcons: icons.nations,
    currentTag: 'emblem',
    selectedIcons: {},
    animationData: {}
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        wx.downloadFile({
          url: res.userInfo.avatarUrl,
          success: resTemp => {
            res.userInfo.avatarUrl = resTemp.tempFilePath
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          wx.downloadFile({
            url: res.userInfo.avatarUrl,
            success: resTemp => {
              res.userInfo.avatarUrl = resTemp.tempFilePath
              app.globalData.userInfo = res.userInfo
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
            }
          })
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
  },
  drawCanvas: function (e) {
    console.log(e)
    let context = wx.createCanvasContext('userinfo-avatar1')
    context.drawImage(this.data.userInfo.avatarUrl, 0, 0, 300, 300)
    for (let key in this.selectedIcons){
      this.selectedIcons[key].path && context.drawImage(this.selectedIcons[key].path, this.selectedIcons[key].position[0], this.selectedIcons[key].position[1], 50, 50)
    }
    context.draw(res => {
      console.log("request")
      this.setData({
        getRequest: "after"
      })
      // this.saveCanvas()
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
  },

  switchTag: function(e) {
    let tagName = e.target.dataset.tagname
    let key = (tagName == 'emblem' || tagName == 'flag') ? 'nations' : tagName
    this.setData({
      currentTag: tagName,
      showIcons: icons[key]
    })
  },

  selectOrNot: function(e) {
    let data = e.target.dataset
    this.selectedIcons = this.selectedIcons ? this.selectedIcons : {}
    this.selectedIcons[data.tagname + data.id] = this.selectedIcons[data.tagname + data.id] ? this.selectedIcons[data.tagname + data.id] : {}
    this.selectedIcons[data.tagname + data.id].path = this.selectedIcons[data.tagname + data.id].path ? null : data.path
    this.selectedIcons[data.tagname + data.id].position = [0,0]
    this.setData({
      selectedIcons: this.selectedIcons
    })
  },

  getStartPosition: function(e) {
    this.startPositions = this.startPositions ? this.startPositions : {}
    this.startPositions[e.target.dataset.index] = this.startPositions[e.target.dataset.index] ? this.startPositions[e.target.dataset.index] : [e.touches[0].pageX, e.touches[0].pageY]
  },

  move: function(e) {
    let dX = e.touches[0].pageX - this.startPositions[e.target.dataset.index][0]
    let dY = e.touches[0].pageY - this.startPositions[e.target.dataset.index][1]
    console.log(dX,dY)
    this.selectedIcons[e.target.dataset.key].position = [dX + 0 > 300 - 50 ? 300 - 50 : (dX + 0 < 0 ? 0 : dX + 0), dY + 0 > 300 - 50 ? 300 - 50 : (dY + 0 < 0 ? 0 : dY + 0)]
    this.setData({
      selectedIcons: this.selectedIcons
    })
  },

  getEndPosition: function(e) {
  }
})
