// pages/enterpriseCertification/enterpriseCertification.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 三种认证状态
     * 2:认证失败
     * -1:未认证
     * 0：审核中
     * 1:已认证
     */
    enterpriseCertificationStatus: null,
    disablebutton: true,
    user_id: null,
    user_OpenID: null


  },
  restart: function() {
    this.setData({
      enterpriseCertificationStatus: -1

    })
  },
  checkchange: function(e) {
    console.log(e.detail.value)
    this.setData({
      disablebutton: !this.data.disablebutton
    })
  },
  apply: function(e) {
    console.log(e)
    if (e.detail.value.companyName == "" || e.detail.value.registerNumber == "" || e.detail.value.peopleName == "" || e.detail.value.idCard == "") {
      wx.showToast({
        title: '请填写完整信息哦',
        icon: 'none',
        image: '',
        duration: 1000,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      return
    }
    var that = this
    wx.showLoading({
      title: '正在提交',
    })
    wx.request({
      url: 'https://www.monodark.cn/test2-maven/insertCompanyApplyInfo',
      data: {
        user_id: app.globalData.userInfo.user_id,
        user_OpenID: app.globalData.userInfo.user_OpenID,
        company_name: e.detail.value.companyName,
        company_registration_number: e.detail.value.registerNumber,
        legal_person_name: e.detail.value.peopleName,
        legal_person_ID_number: e.detail.value.idCard
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function(res) {
        console.log('success:' + res)
        wx.showToast({
          title: '您的申请已提交',
        })
        that.setData({
          enterpriseCertificationStatus: 0
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    wx.hideLoading();

  },
  /**
   * 协议入口
   */
  toAgreement: function() {
    wx.navigateTo({
      url: '../agreement/agreement',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.request({
      url: 'https://www.monodark.cn/test2-maven/selectCompanyApplyInfoByUserId',
      data: {
        user_id: app.globalData.userInfo.user_id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function(res) {
        if (res.data == 0) {
          console.log("无认证申请")
          that.setData({
            enterpriseCertificationStatus: -1
          })
          return
        }
        console.log(res)
        that.setData({
          enterpriseCertificationStatus: res.data[0].authentication_state
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
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