//app.js
App({
  onLaunch: function () {
    var that = this

    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)

    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    //checkSession
    wx.checkSession({
      success: function (res) {
        console.log(res)
        wx.getStorage({
          key: '3rd_session',
          success: function (res) {
            console.log(res)
            that.globalData.openID = res.data.OpenID
            that.globalData.userInfo = res.data.userInfo
            that.globalData.loginSuccess = true
          },
          fail: function (res) {
            that.globalData.loginSuccess = fail
          },
          complete: function (res) { 
            if (that.checkSessionCallback()) {
              that.checkSessionCallback()
            }
          },
        })

      },
      fail: function (res) {
        console.log("sessionfail")
        that.globalData.loginSuccess = false
        if (that.checkSessionCallback()) {
          that.checkSessionCallback()
        }
      },
      complete: function (res) { 
        //检查登录态回调
        
      },
    })

    wx.getSystemInfo({
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  globalData: {
    requestURL:'http://47.97.153.38:8080/',
    wifiSSID:'look',
    wifiBSSID:"2e:af:78:c5:ed:4d",
    userInfo: null,
    loginSuccess:null,
    openID:null

  },
  showToast:function(msg){
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1000,
    })
  },
  doLogin:function(){
    
  }
})