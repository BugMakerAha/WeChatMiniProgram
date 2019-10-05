// pages/feedBack/feedBack.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempPhotoPath:[],
    canAddPhoto:true

  },
  deletePhoto:function(e){
    var that = this;
    let index = e.currentTarget.dataset.index;
    let array = that.data.tempPhotoPath;
    array.splice(index,1);
    that.setData({
      tempPhotoPath:array,
      canAddPhoto:true
    })
    
  },
  preview:function(e){
    var that = this;
    let index=e.currentTarget.dataset.index;
    wx.previewImage({
      current: that.data.tempPhotoPath[index],
      urls: that.data.tempPhotoPath,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 提交表单
   */
  submit:function(e){
       console.log(e);
       if(e.detail.value.phone == 0 || e.detail.value.feedtext == 0)
       {
           wx.showToast({
               title: '不能为空',
           })
       }
       else{
           wx.navigateBack({
               delta: 1
           })
           wx.showToast({
               title: '提交成功！',
           });
          
       }
  },
  getPhoto:function(){
    var that = this;
    let length =4- (that.data.tempPhotoPath.length);
    
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      count:length,
      success: function(res) {
        that.setData({
          tempPhotoPath: that.data.tempPhotoPath.concat(res.tempFilePaths)
        })
        if (that.data.tempPhotoPath.length == 4) {
          that.setData({
            canAddPhoto: false
          })
          console.log(that.data.canAddPhoto);
        }
      },
      
      
    })
    
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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

  }
})