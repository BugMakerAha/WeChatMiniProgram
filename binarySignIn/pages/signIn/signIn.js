//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {




  },
  qiandao: function() {
    wx.showLoading({
      title: '请等待',
      mask: true,

    })
    wx.startWifi({
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    //核对wifi
    wx.getConnectedWifi({
      success: function(res) {
        console.log(res)
        if (res.wifi.SSID == app.globalData.wifiSSID && res.wifi.BSSID == app.globalData.wifiBSSID) {
          //wifi验证通过
          //指纹
          wx.checkIsSupportSoterAuthentication({
            success(res) {
              console.log(res)
              if (res.supportMode.length == 0) {
                //不支持指纹
                wx.showToast({
                  title: '签到成功',

                })

              } else {
                wx.startSoterAuthentication({
                  requestAuthModes: ['fingerPrint'],
                  challenge: '123456',
                  authContent: '请用指纹解锁',
                  success(res) {
                    wx.showToast({
                      title: '签到成功',

                    })
                  },
                  fail() {
                    wx.showToast({
                      title: '签到失败',
                      image: 'none'
                    })
                  },

                })
              }
              // res.supportMode = ['fingerPrint', 'facial'] 支持指纹识别和人脸识别
            }
          })



        } else {
          //wifi
          wx.showToast({
            title: '请连接指定WiFi进行签到',
            icon: 'none'
          })
          return
        }
      },
      fail: function(res) {
        console.log("fail")
        console.log(res)
        wx.showToast({
          title: '请连接指定WiFi进行签到',
          icon: 'none'
        })
      },
      complete: function(res) {},
    })

    wx.hideLoading()


  },
  onLoad: function() {
    let that = this
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
    wx.startWifi({
      success: function(res) {
        that.getWifiList()
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    
  },
  getWifiList:function(){
    var that = this
    wx.openSetting({
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    wx.getWifiList({
      success: function(res) {
        console.log(res)
        that.setData({
          wifiList:res
        })
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {},
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})