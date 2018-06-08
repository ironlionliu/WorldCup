//index.js
//获取应用实例
//注意必须通过setData才能改变页面的内容
const app = getApp()
var interval

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
    userInfo: {},
    isReady: false,
    avatarPath: '',
    saveImage: null,
    getRequest: 'before',
    tagList: tagList,
    showIcons: icons.nations,
    currentTag: 'emblem',
    currentImage: '',
    selectedIcons: {},
    animationData: {},
    footballClass: 'football-vibrate',
    rotateDeg: 0,
    scaleValue: 1
  },

  //给定起始点画四分之三圆
  drawCircle(s, context) {
    var deltas = 0.1 * Math.PI
    context.clearRect(0, 0, 320, 160)
    context.setLineWidth(10)
    var style = ''
    for(var i = 0; i < 15; i++) {
      style = 'rgba(255, 255, 255, ' + (i/15) + ')'
      context.setStrokeStyle(style)
      context.beginPath()
      context.arc(160, 80, 70, s + i*deltas, s + (1+i)*deltas)
      context.stroke()
    }
    context.draw()

  },

  onReady: function() {
    var context = wx.createCanvasContext('loadCanvas')
    this.drawCircle(0, context)
    var i = 0 //闭包
    var v = 0.1 * Math.PI
    interval = setInterval(() => {
      i++
      this.drawCircle(v * i, context)
    }, 500)
  },
  
  onLoad: function () {

    var reg = /\d+$/
    var url = app.globalData.userInfo.avatarUrl.replace(reg, '0')
    console.log(url)
    //默认得到了用户信息
    //下载用户头像
    wx.downloadFile({
      url: url,
      //下载成功渲染页面
      success: res => {
        console.log(res),
        //清除interval
        clearInterval(interval)
        //设置变量，页面内容更新
        this.setData({
          userInfo: app.globalData.userInfo,
          avatarPath: res.tempFilePath,
          isReady: true
        })
        //绘制用户头像
        //this.drawCanvas()
      }
    })
  },

  //在画布上画图片
  drawCanvas: function (e) {
    console.log("在画布上画图片")
    let context = wx.createCanvasContext('userAvatarCanvas')
    context.drawImage(this.data.avatarPath, 0, 0, 200, 200)
    console.log(context)
    // for (let key in this.selectedIcons) {
    //   context.translate(this.selectedIcons[key].position[0] + this.selectedIcons[key].size[0] / 2, this.selectedIcons[key].position[1] + this.selectedIcons[key].size[1]/2)
    //   context.rotate(this.selectedIcons[key].rotate * Math.PI / 180)
    //   this.selectedIcons[key].path && context.drawImage(this.selectedIcons[key].path, -this.selectedIcons[key].size[0] / 2, -this.selectedIcons[key].size[1] / 2, this.selectedIcons[key].size[0], this.selectedIcons[key].size[1])
    //   context.rotate(-this.selectedIcons[key].rotate * Math.PI / 180)
    //   context.translate(-this.selectedIcons[key].position[0] - this.selectedIcons[key].size[0] / 2, -this.selectedIcons[key].position[1] - this.selectedIcons[key].size[1] / 2)  
    // }
    context.draw()
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
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath
        })
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
    this.currentIcon = this.currentIcon ? this.currentIcon : data.tagname + data.id
    this.selectedIcons[data.tagname + data.id] = {
      path: this.selectedIcons[data.tagname + data.id].path ? null : data.path,
      position: [0, 0],
      size: [50, 50],
      rotate: 0
    }
    let tempArr = []
    for(let key in this.selectedIcons){
      this.selectedIcons[key].path ? tempArr.push(key) : ''
    }
    this.currentIcon = this.selectedIcons[data.tagname + data.id].path ? data.tagname + data.id : tempArr[tempArr.length-1]
    console.log(this.selectedIcons, this.currentIcon)
    this.setData({
      selectedIcons: this.selectedIcons
    })
  },

  getStartPosition: function(e) {
    this.startPositions = this.startPositions ? this.startPositions : {}
    this.startPositions[e.target.dataset.key] = this.startPositions[e.target.dataset.key] ? this.startPositions[e.target.dataset.key] : [e.touches[0].pageX, e.touches[0].pageY]
    this.currentIcon = e.target.dataset.key
  },

  move: function(e) {
    let [width,height] = this.selectedIcons[e.target.dataset.key].size
    let dX = e.touches[0].pageX - this.startPositions[e.target.dataset.key][0]
    let dY = e.touches[0].pageY - this.startPositions[e.target.dataset.key][1]
    console.log(dX,dY)
    this.selectedIcons[e.target.dataset.key].position = [dX + 0 > 300 - width ? 300 - width : (dX + 0 < 0 ? 0 : dX + 0), dY + 0 > 300 - height ? 300 - height : (dY + 0 < 0 ? 0 : dY + 0)]
    this.setData({
      selectedIcons: this.selectedIcons,
    })
    this.currentIcon = e.target.dataset.key
  },

  getEndPosition: function(e) {
    this.currentIcon = e.target.dataset.key
  },

  changeSize: function(e) {
    if(!this.currentIcon) return
    let speed = 10, ratio = this.selectedIcons[this.currentIcon].size[1] / this.selectedIcons[this.currentIcon].size[0]
    if (e.target.dataset.direction == '-'){
      this.selectedIcons[this.currentIcon].size = this.selectedIcons[this.currentIcon].size[0] < 11 ? this.selectedIcons[this.currentIcon].size : this.selectedIcons[this.currentIcon].size.map((item, index) => {return item - speed*(1-(1-ratio)*index)})
    }else{
      this.selectedIcons[this.currentIcon].size = this.selectedIcons[this.currentIcon].size[0] > 149 ? this.selectedIcons[this.currentIcon].size : this.selectedIcons[this.currentIcon].size.map((item, index) => {return item + speed * (1 - (1 - ratio) * index) })
    }
    this.setData({
      selectedIcons: this.selectedIcons
    })
  },

  iRotate: function(e) {
    if (!this.currentIcon) return
    let speed = 5
    this.selectedIcons[this.currentIcon].rotate += (e.target.dataset.direction == '-' ? -speed : speed)
    this.setData({
      selectedIcons: this.selectedIcons
    })
  },

  imageFromAlbum: function(e) {
    wx.chooseImage({
      count: 1,
      success: res => {
        this.setData({
          avatarUrl: res.tempFilePaths[0]
        })
      }
    })
  }
})
