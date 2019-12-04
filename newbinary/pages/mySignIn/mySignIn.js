// pages/mySignIn/mySignIn.js
const signInUtil = require("../../common/utils/aboutSignIn.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    tips: "未连接",
    currentSignIn: null,
    joinedList:null,

    searchedSign: null,

    refreshing: false,
    havesign: false,
    signInState:[]
  },
  //快速签到
  signIn: function(res) {
    var index = res.currentTarget.dataset.index
    var that = this
    if (that.data.currentSignIn == null) {
      return
    }
    if(that.data.signInState[index]){
      app.showToast("不要重复签到哦")
      return
    }
    wx.showLoading({
      title: '稍等',
      mask: true,

    })
    signInUtil.signIn({
      currentSignIn: that.data.currentSignIn[index],
      success(res) {
        wx.hideLoading()
        wx.showToast({
          title: '签到成功',
          icon: 'success',
          duration: 1000

        })
        that.data.signInState[index]=true
      },
      fail(res) {
        wx.hideLoading()
        console.log(res)
        wx.showToast({
          title: "签到失败:" + res.data,
          icon: 'none',
          duration:1000
        })
      }
    })

  },
  addtoList: function(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    wx.request({
      url: app.globalData.requestURL + 'BinaryStudio/handleAttendance/addAttendanceUser',
      data: {
        user_OpenID:app.globalData.openID,
        attendance_id:e.currentTarget.dataset.attendance_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function(res) {
        console.log(res)
        wx.showToast({
          title: '加入考勤成功',
          icon: 'none',
          duration: 1000,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  changeWifi: function() {

    wx.getWifiList({
      success: function(res) {
        console.log(res)
        that.setData({
          wifiList: res
        })
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {},
    })
  },
  refresh: function() {
    var that = this
    if (that.data.refreshing) {
      return
    }
    that.setData({
      refreshing: true,
      havesign: false
    })
    signInUtil.getWifiInfo({

      success: function(res) {
        var wifiInfo = res.data
        console.log(res)
        that.setData({
          tips: res.data.SSID,

        })

        //根据wifi获取绑定的打卡信息
        //setdata searchedSign
        signInUtil.getSignInInfoByWifi({
          attendance_BSSID: wifiInfo.BSSID,
          success: function(res) {
            console.log(res.data)
            that.setData({
              currentSignIn: res.data,
              havesign: true,
              refreshing: false
            })
            for(let i=0;i<that.data.currentSignIn.length;i++){
              that.data.signInState[i]=false
            }
            console.log(that.data.signInState)
          },
          fail:function(){
            that.setData({
              havesign:false,
              currentSignIn:null,
              refreshing:false
            })
          }
        })



      },
      fail: function(res) {
        //未连接wifi或者错误
        console.log(res)
        that.setData({
          tips: "未连接"
        })

      },
      complete: function(res) {
        that.setData({
          refreshing: false
        })
      },
    })
    //获取自己加入的考勤
    wx.request({
      url: app.globalData.requestURL +'BinaryStudio/handleAttendance/findAttendanceByUserOpenID',
      data: {
        user_OpenID:app.globalData.openID
      },
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function(res) {
        console.log(res)
        that.setData({
          joinedList:res.data
        })

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.refresh()
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

  }
})