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
    showModal: false,
    loginSuccess: false,
    realName: ''


  },
  //事件处理函数
  bindViewTap: function() {




  },
  toMySignIn: function() {
    if (this.checkLogin()) {

      wx.navigateTo({
        url: '../mySignIn/mySignIn',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  toNewSignIn: function() {
    if (this.checkLogin()) {

      this.setData({
        showPass: true
      })
    }

  },
  closePass: function() {
    this.setData({
      showPass: false
    })
  },
  passinput: function(e) {
    console.log(e)
    this.data.password = e.detail.value
  },
  applyPass: function() {
    var that = this
    if (that.data.password == '8888') {
      that.setData({
        showPass: false
      })
      wx.navigateTo({
        url: '../createSignIn/createSignIn',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      wx.showToast({
        title: '密码错误',
        icon: 'none',
        duration: 1000,
      })
    }
  },
  onLoad: function() {
    var that = this
    if (app.globalData.loginSuccess == null) {

      app.checkSessionCallback = () => {
        that.setData({
          loginSuccess: app.globalData.loginSuccess
        })
      }
    } else {
      that.setData({
        loginSuccess: app.globalData.loginSuccess
      })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        loginSuccess: app.globalData.loginSuccess
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


    // var step1 = () => {
    //   return new Promise((res,rej) => {
    //     console.log(Date.now() + ' step1')
    //     setTimeout(res, 2000)
    //   })
    // }
    // var step2 = () => {
    //   return new Promise((res,rej) => {
    //     console.log(Date.now() + ' step2')
    //     setTimeout(res, 4000)
    //   })
    // }
    // step1().then(step2).then(()=>{
    //   console.log(Date.now() + ' step3')
    // })
  },
  login: function(e) {
    wx.showLoading({
      title: '登录中',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    console.log(e)
    var that = this

    if (e.detail.userInfo) {
      //成功获取用户信息
      app.globalData.userInfo = e.detail.userInfo
      that.setData({
        hasUserInfo: true
      })

      wx.login({
        success: function(res) {
          console.log(res)
          wx.request({
            url: app.globalData.requestURL + 'BinaryStudio/handleLogin/getOpenID',
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: "post",
            success: function(res) {
              app.globalData.openID = res.data.openid
              console.log(res)
              console.log(that.data.userInfo)
              console.log(app.globalData.openID)

              //判断是否插入过用户数据
              wx.request({
                url: app.globalData.requestURL + 'BinaryStudio/handleUser/selectUserInfoByUserOpenID',
                data: {
                  user_OpenID: app.globalData.openID
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'post',
                success: function(res) {
                  console.log("debug")
                  console.log(res)
                  if (res.data.length == 0) {
                    //未插入过数据
                    that.setData({
                      showModal: true
                    })
                    wx.hideLoading()
                  } else {
                    //已插入数据
                    that.setData({
                      loginSuccess: true,
                      userInfo: app.globalData.userInfo
                    })
                    app.globalData.userServerData = res.data[0]
                    wx.setStorage({
                      key: '3rd_session',
                      data: {
                        OpenID: app.globalData.openID,
                        userInfo: res.data[0]
                      },
                      success: function(res) {},
                      fail: function(res) {},
                      complete: function(res) {},
                    })
                    wx.hideLoading()

                  }
                },
                fail: function(res) {},
                complete: function(res) {
                  wx.hideLoading()
                },
              })

            },
            fail: function(res) {
              wx.hideLoading()

            },
            complete: function(res) {},
          })
        },
        fail: function(res) {
          wx.hideLoading()
        },
        complete: function(res) {},
      })
    } else {
      wx.showToast({
        title: '获取用户信息失败',
        icon: 'none',
        duration: 1000,
        mask: true,
      })
    }
  },
  applyInfo: function() {
    wx.showLoading({
      title: '稍等',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    var that = this
    if (that.data.realName == '') {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 1000,
      })
      return
    }
    //插入用户数据
    wx.request({
      url: app.globalData.requestURL + "BinaryStudio/handleUser/addUsers",
      data: {
        user_gender: app.globalData.userInfo.gender,
        user_avatarUrl: app.globalData.userInfo.avatarUrl,
        user_nickName: app.globalData.userInfo.nickName,
        user_OpenID: app.globalData.openID,
        user_realName: that.data.realName

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',

      success: function(res) {
        console.log("插入用户数据成功")
        that.setData({
          loginSuccess: true,
          showModal: false,
          userInfo: app.globalData.userInfo

        })
        app.globalData.loginSuccess = true
        wx.setStorage({
          key: '3rd_session',
          data: {
            OpenID: res.data.openid,
            userInfo: {
              user_gender: app.globalData.userInfo.gender,
              user_avatarUrl: app.globalData.userInfo.avatarUrl,
              user_nickName: app.globalData.userInfo.nickName,
              user_OpenID: app.globalData.openID,
              user_realName: that.data.realName
            }
          },
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      },
      fail: function(res) {
        app.globalData.loginSuccess = false

      },
      complete: function(res) {
        wx.hideLoading()
      },
    })

  },
  changeRealName: function(e) {
    this.data.realName = e.detail.value
  },
  checkLogin: function() {
    if (!this.data.loginSuccess) {
      app.showToast("请先登录")
    }
    return this.data.loginSuccess
  }
})