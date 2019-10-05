// pages/mySignIn/mySignIn.js
const signInUtil = require("../../common/utils/aboutSignIn.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    tips:"未连接",
    currentSignIn: null,
    signInList:[{
      signInName:"二进制工作室打卡",
      signInTime:"9:00-21:00"
    }],
    
    searchedSign:null,

    refreshing:false,
    havesign:false
  },
  //快速签到
  signIn:function(res){
    var that = this
    if(that.data.currentSignIn==null){
      return
    }
    wx.showLoading({
      title: '稍等',
      mask: true,
      
    })
    signInUtil.signIn({
      currentSignIn:that.data.currentSignIn,
      success(res){
        wx.showToast({
          title: '签到成功',
          icon: 'success',
          
        })
        wx.hideLoading()
      },
      fail(res){
        console.log(res)
        wx.showToast({
          title: "签到失败:"+res.data,
          icon: 'none'
        })
        wx.hideLoading()
      }
    })

  },
  addtoList:function(){
    wx.showToast({
      title: '您已经添加过了！',
      icon: 'none',
      
    })
  },
  changeWifi:function(){
    wx.openSetting({
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
    wx.getWifiList({
      success: function (res) {
        console.log(res)
        that.setData({
          wifiList: res
        })
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) {},
    })
  },
  refresh:function(){
    var that = this
    if(that.data.refreshing){
      return
    }
    that.setData({
      refreshing:true,
      havesign:false
    })
    signInUtil.getWifiInfo({
      
      success: function (res) {
        var wifiInfo = res.data
        console.log(res)
        that.setData({
          tips:res.data.SSID,
          
        })

        //根据wifi获取绑定的打卡信息
        //setdata searchedSign
        signInUtil.getSignInInfoByWifi({
          wifiInfo:wifiInfo,
          success:function(res){
            console.log(res.data)
            that.setData({
              currentSignIn:res.data,
              havesign:true,
              refreshing:false
            })
          }
        })



       },
      fail: function (res) { 
        //未连接wifi或者错误
        console.log(res)
        that.setData({
          tips:"未连接"
        })

      },
      complete: function (res) { 
        that.setData({
          refreshing:false
        })
      },
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.refresh()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})