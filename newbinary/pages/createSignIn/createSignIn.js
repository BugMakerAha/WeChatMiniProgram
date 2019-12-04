// pages/createSignIn/createSignIn.js
const util = require("../../utils/util.js")
const signInUtil = require("../../common/utils/aboutSignIn.js")

const app = getApp()
const date = new Date()
const hours = []
const mins = []

for (let i = 0; i <= 23; i++) {
  hours.push(i)
}

for (let i = 0; i <= 59; i++) {

  mins.push(i)
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips: "未连接",
    showWindow: false,
    currentWifi: null,
    createdAttendance: null,
    hours: hours,
    hour: 0,
    mins: mins,
    min: 0,
    value: [0, 0]
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
    var that = this
    that.refreshArray()
    //刷新wifi状态
    signInUtil.getWifiInfo({
      success: function(res) {
        var wifiInfo = res.data
        console.log(res)
        that.setData({
          currentWifi: res.data,
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
              havesign: true
            })
          },
          fail: function(res) {
            that.setData({
              havesign: false
            })
          }
        })



      },
      fail: function(res) {
        //未连接wifi或者错误
        console.log(res)
        that.setData({
          tips: "未连接",
          currentWifi: null
        })

      },
      complete: function(res) {

      },
    })
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
  create: function() {
    var that = this
    console.log(util.formatTime(new Date()).toString())
    if (that.data.currentWifi == null) {
      wx.showToast({
        title: '请先连接wifi',
        icon: 'none',
        duration: 1000,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      return
    }
    that.setData({
      showWindow: true
    })

  },
  createsubmit: function(e) {
    var that = this
    console.log(e)
    if (e.detail.value.title == "") {
      wx.showToast({
        title: '标题不能为空',
        icon: 'none',

      })
      return
    }
    wx.request({
      url: app.globalData.requestURL + 'BinaryStudio/handleAttendance/addAttendance',
      data: {
        attendance_title: e.detail.value.title,
        attendance_SSID: that.data.currentWifi.SSID,
        attendance_BSSID: that.data.currentWifi.BSSID,
        attendance_time: e.detail.value.picker[0] + ':' + e.detail.value.picker[0],
        attendance_leader: app.globalData.openID
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function(res) {
        console.log(res)
        that.setData({
          showWindow: false
        })
        that.refreshArray()
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  bindChange: function(e) {
    const val = e.detail.value
    this.setData({
      hour: this.data.hours[val[0]],
      min: this.data.mins[val[1]],
      value: [this.data.hours[val[0]], this.data.mins[val[1]]]
    })
  },
  attendanceInfo: function(e) {
    console.log(e)
    let attendance_id = this.data.createdAttendance[e.currentTarget.dataset.index].attendance_id
    wx.navigateTo({
      url: '../attendanceInfo/attendanceInfo?attendance_id=' + attendance_id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  refreshArray: function() {
    var that = this
    console.log(app.globalData.openID)
    wx.request({
      url: app.globalData.requestURL + 'BinaryStudio/handleAttendance/selectAttendanceByLeaderOpenID',
      data: {
        attendance_leader_OpenID: app.globalData.openID
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function(res) {
        console.log(res)
        that.setData({
          createdAttendance: res.data
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  closeWindow: function() {
    this.setData({
      showWindow: false
    })
  }
})