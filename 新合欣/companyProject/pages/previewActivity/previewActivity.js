// pages/previewActivity/previewActivity.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activity_img: "",
    activity_leader_icon: "",
    activity_leader: '',
    activity_title: "",
    activity_address: "",
    activity_time: "",
    activity_deadline: "2019.6.9",
    activity_population: 0,
    activity_present_population: null,
    activity_percent: null,
    activity_id: null,
    activity_describe:null,
    persons: [],
    activity_content: "",
    images: [],
    readonly:false
  },
  oneditorready: function () {
    var that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
      that.editorCtx.setContents({
        html: app.globalData.activityEdit,
        success: function (res) {
          that.setData({
            readonly: true
          })
        },
      })
    }).exec()
  },
  backPreview:function(){
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
    this.setData({
        activity_id: options.activity_id,
        activity_img: options.activity_img,
        activity_title: options.activity_title,
        activity_adress: options.activity_adress,
        activity_population: options.activity_population,
        activity_date: options.activity_date,
        activity_start_date: options.activity_start_date,
        activity_date_deadline: options.activity_date_deadline,
        activity_time: options.activity_time,
        activity_time_deadline: options.activity_time_deadline,
      activity_describe: JSON.parse(options.activity_describe),
        activity_leader: options.activity_leader,
        activity_leader_icon: options.activity_leader_icon,
        activity_present_population:options.activity_present_population
    })
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

  },
  
})