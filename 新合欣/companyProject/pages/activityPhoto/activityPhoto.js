// pages/activityPhoto/activityPhoto.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoArray: null,
    usericon: null,
    activity_leader: null,
    activity_verified: null,
    activity_leader_icon: null,
    activity_id: null,
    photoArraylength: null
  },
  preview: function(e) {
    var that = this;
    let index = e.currentTarget.dataset.index;
    console.log(index + " aaa ")
    console.log(that.data.photoArray)
    wx.previewImage({
      current: that.data.photoArray[index],
      urls: that.data.photoArray,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log(options)
    this.setData({
      activity_leader: options.activity_leader,
      activity_leader_icon: options.activity_leader_icon,
      activity_verified: options.activity_verified,
      activity_id: options.activity_id
    });
    wx.request({
      url: 'https://www.monodark.cn/test2-maven/selectActivityInfoByActivityId',
      method: 'POST',
      data: {
        activity_id: that.data.activity_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res)
        that.setData({
          photoArray: JSON.parse(res.data.activity_live_img)
        })
        if (that.data.photoArray[0] == null) {
          var photoArray = that.data.photoArray
          photoArray.splice(0, 1)
          that.setData({
            photoArray: photoArray
          })
          
        }
        that.setData({
          photoArraylength: Math.ceil(that.data.photoArray.length / 2)
        })
      }
    })
  },
  //举报
  jubao:function(){
    console.log("举报成功")
    wx.showToast({
      title: '举报成功,我们会尽快处理',
      icon: 'none',
      image: '',
      duration: 1000,
      mask: true,
      success: function(res) {},
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