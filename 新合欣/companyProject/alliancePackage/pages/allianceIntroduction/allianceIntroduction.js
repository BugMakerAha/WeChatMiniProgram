// pages/allianceIntroduction/allianceIntroduction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Array1: [{
      src: '/images/peixunxuexi.png',
      text: "培训学习"
    }, {
      src: '/images/shidizoufang.png',
      text: "实地走访"
    }, {
      src: '/images/ziyuanhuhuan.png',
      text: "资源互换"
    },],
    Array2: [{
      src: '/images/changdi.png',
      text: "场地共享"
    }, {
      src: '/images/qudao.png',
      text: "渠道共享"
    }, {
      src: '/images/rencai.png',
      text: "人才共享"
    }, ]
  },
  toAllianceArea:function(){
    wx.navigateTo({
      url: '../allianceArea/allianceArea',
      success: function(res) {},
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