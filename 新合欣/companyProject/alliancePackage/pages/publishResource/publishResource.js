// pages/activityEdit/activityEdit.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {


    activity_describe: [{
      status: false,
      title: "",
      content: ""
    }, {
      status: false,
      title: "",
      content: ""
    }, {
      status: false,
      title: "",
      content: ""
    }, {
      status: false,
      title: "",
      content: ""
    },],

    activity_img: ["/images/publicImage.png"],
    tempPhotoPath: [],
  },

  deleteItem: function (e) {
    let that = this;
    let idx = e.currentTarget.dataset.idx;
    let array = that.data.activity_describe;
    array[idx].title = "";
    array[idx].content = "";
    array[idx].status = false;
    that.setData({
      activity_describe: array
    })
  },

  additem: function () {
    var that = this;
    var array = that.data.activity_describe;
    for (let i = 0; i < array.length; i++) {
      if (!array[i].status) {
        array[i].status = true;
        break;
      }
    }
    that.setData({
      activity_describe: array
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
  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          activity_img: tempFilePaths,
          showtip: true
        })
      },
    })
  },


})