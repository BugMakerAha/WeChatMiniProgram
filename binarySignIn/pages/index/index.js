//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {
      avatarUrl: "/images/usericon.png",
      nickName: "登录后可体验全部功能"
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    usericon: "/images/usericon.png",
    topTip: "登录后可体验全部功能",
    showModal: false


  },
  //事件处理函数
  bindViewTap: function() {




  },
  toMySignIn: function() {
    wx.navigateTo({
      url: '../mySignIn/mySignIn',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
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
        }
      })
    }
  },
  login: function(e) {
    console.log(e)
    
    if (e.detail.userInfo) {
      //成功获取用户信息
      app.globalData.userInfo = e.detail.userInfo

      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    } else {

    }
  }
})