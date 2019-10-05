// pages/mine/mine.js
const checkutils = require('../../common/activityUtils/checkUtils.js')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    banbenhao: app.globalData.banbenhao,

    showModal: true,
    user_avatarUrl: "/images/usericon.png",
    user_nickName: "未登录",
    user_activity_fav_count: 0,
    user_apply_count: 0,
    user_activity_detail_count: 0,
    bottomMenuArray: [{
      iconRes: '/images/identity.png',
      txt: '加入昱奢商业联盟'
    }, {
      iconRes: '/images/personal.png',
      txt: '个人用户通行认证'
    }, {
      iconRes: '/images/service.png',
      txt: '在线客服'
    }, {
      iconRes: '/images/report.png',
      txt: '投诉建议'
    }, {
      iconRes: '/images/qqimg.png',
      txt: 'QQ粉丝团'
    }]
  },
  toHighPlayer: function() {
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo.advanced_players_state == 1) {
      wx.navigateTo({
        url: '../../highPlayerPackage/pages/playerArea/playerArea',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      wx.navigateTo({
        url: '../../highPlayerPackage/pages/highPlayer/highPlayer',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("show")
    var that = this;
    wx.checkSession({
      success() {
        that.setData({
          showModal: false
        })
        app.globalData.islogin = true
        //session_key 未过期，并且在本生命周期一直有效         
        wx.login({
          success(res) {
            wx.request({
              url: 'https://www.monodark.cn/test2-maven/getUserInfoByCode',
              data: {
                code: res.code
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'post',
              success(res) {
                app.globalData.userInfo = res.data

                that.setData({
                  user_nickName: res.data.user_nickName,
                  user_avatarUrl: res.data.user_avatarUrl,
                  user_OpenID: res.data.user_OpenID,
                  user_verified: res.data.user_verified,
                  user_activity_detail_count: res.data.user_activity_detail_count,
                  user_activity_fav_count: res.data.user_activity_fav_count,
                  user_apply_count: res.data.user_apply_count
                });
                wx.hideLoading();
              },
              fail() {
                wx.showToast({
                  title: '获取信息失败',
                  icon: 'none',

                })
              }
            })
          }
        })
      },
      fail() {
        that.setData({
          showModal: true
        })
        app.globalData.islogin = false
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.startPullDownRefresh({

    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  login: function(e) {
    var that = this;
    console.log(e.detail.userInfo);
    if (!e.detail.userInfo) {
      wx.showToast({
        title: '获取用户信息失败',
        icon: 'none',
        image: '',
        duration: 500,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      return
    }
    wx.login({
      success(res) {
        console.log(res.code);
        wx.request({
          url: 'https://www.monodark.cn/test2-maven/loginByWeiXing',
          data: {
            code: res.code,
            nickName: e.detail.userInfo.nickName,
            avatarUrl: e.detail.userInfo.avatarUrl,
            gender: e.detail.userInfo.gender,
            language: e.detail.userInfo.language,
            province: e.detail.userInfo.province,
            country: e.detail.userInfo.country,
            city: e.detail.userInfo.city
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'post',
          success(res) {
            console.log(res.data)
            app.globalData.userInfo = res.data
            that.onShow()
          },
          fail() {
            wx.showToast({
              title: '登录失败',
            })
          }
        })
        that.setData({
          showModal: false
        })
      }
    })
  },
  locallogin: function(e) {
    var that = this;
    console.log("click")
    wx.showLoading({
      mask: true
    })
    wx.vibrateShort({
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    var that = this;
    console.log(e.detail.userInfo);
    if (!e.detail.userInfo) {
      wx.showToast({
        title: '获取用户信息失败',
        icon: 'none',
        image: '',
        duration: 500,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      wx.hideLoading()
      return
    }
    wx.login({
      success(res) {
        console.log(res.code);
        wx.request({
          url: 'https://www.monodark.cn/test2-maven/loginByWeiXing',
          data: {
            code: res.code,
            nickName: e.detail.userInfo.nickName,
            avatarUrl: e.detail.userInfo.avatarUrl,
            gender: e.detail.userInfo.gender,
            language: e.detail.userInfo.language,
            province: e.detail.userInfo.province,
            country: e.detail.userInfo.country,
            city: e.detail.userInfo.city
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'post',
          success(res) {
            console.log(res.data)
            app.globalData.userInfo = res.data
            wx.hideLoading()
          },
          fail() {
            wx.showToast({
              title: '登录失败',
            })
          }
        })
        that.setData({
          showModal: false
        })
      }
    })

  },
  bottomMenuClick: function(e) {
    var idx = e.currentTarget.dataset.index;
    console.log(idx);
    switch (idx) {
      case 0:
        wx.navigateTo({
          url: '../payForAlliance/payForAlliance',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
        break;
      case 1:
        wx.navigateTo({
          url: '../personalCertification/personalCertification',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
        break;
      case 2:
        break
      case 3:

        wx.navigateTo({
          url: '../feedBack/feedBack',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        });
        break;
      case 4:
        wx.navigateTo({
          url: '../officialGroup/officialGroup'
        });
        break;


    }
  },
  toallianceIntroduction: function() {
    checkutils.checkAllianceState({
      success: function(res) {
        //console.log(res)
        if (res == 1) {
          wx.navigateTo({
            url: '../../alliancePackage/pages/allianceArea/allianceArea',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        } else {
          wx.showToast({
            title: '您还未受邀请',
            icon: 'none',
            image: '',
            duration: 500,
            mask: true,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      }
    })


  },
  tomyActivity: function() {
    // wx.showToast({
    //   title: '该功能暂未开放',
    // icon: 'none',
    //  duration: 2000
    // })
    wx.navigateTo({
      url: '../myActivity/myActivity',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  tomyMessage: function() {
    //wx.showToast({
    //    title: '该功能暂未开放',
    //    icon: 'none',
    //    duration: 2000
    // })
    wx.navigateTo({
      url: '../myMessage/myMessage',
    })
  },
  tomyCollection: function() {
    // wx.showToast({
    //    title: '该功能暂未开放',
    //   icon: 'none',
    //  duration: 2000
    // })
    wx.navigateTo({
      url: '../myCollection/myCollection',
    })
  }
})