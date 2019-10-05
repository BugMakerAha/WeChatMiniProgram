// pages/uploadPhoto/uploadPhoto.js
Page({

/**
   * 页面的初始数据
   */
  data: {
    tempPhotoPath: [],
    tempPhotoPaths: ['', '', '', '', '', '', '', '', '', '', ],
    canAddPhoto: true,
    showsubmit: false,
    showclose: false,
    showmask: false,
    showbigmask: false,
    tips:'照片最多可上传10张哦',
    activity_id:null,
    activity_leader:null,
    activity_leader_icon:null,
    activity_verified:null,
    imggroup:[]
  },
  //退出编辑状态时触发
  closedelete: function() {
    this.setData({
      showbigmask: false,
      showclose: false,
      showmask: false,
      tips: "长按可编辑"

    })
  },
  showclose: function() {
    wx.vibrateShort({
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    this.setData({
      showclose: true,
      showmask: true,
      showbigmask: true,
      tips: '点击空白处退出编辑状态'

    })
  },
  deletePhoto: function(e) {
    var that = this;
    let index = e.currentTarget.dataset.index;
    let array = that.data.tempPhotoPath;
    array.splice(index, 1);
    that.setData({
      tempPhotoPath: array,
      canAddPhoto: true
    })
    if (that.data.tempPhotoPath.length == 0) {
      that.setData({
        showsubmit: false,
        showbigmask:false,
        showmask:false,
        showclose:false,
        tips:'照片最多可上传10张哦'
      })
    }

  },
  preview: function(e) {
    var that = this;
    let index = e.currentTarget.dataset.index;

    wx.previewImage({
      current: that.data.tempPhotoPath[index],
      urls: that.data.tempPhotoPath,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  getPhoto: function() {
    var that = this;
    let length = 9 - (that.data.tempPhotoPath.length);

    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      count: length,
      success: function(res) {
        that.setData({
          tempPhotoPath: that.data.tempPhotoPath.concat(res.tempFilePaths)
        })
        if (that.data.tempPhotoPath.length == 10) {
          that.setData({
            canAddPhoto: false
          })
          console.log(that.data.canAddPhoto);
        }
        if (that.data.tempPhotoPath.length > 0) {
          that.setData({
            showsubmit: true,
            tips:"长按可编辑"
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      this.setData({
          activity_id:options.activity_id,
          activity_verified:options.activity_verified,
          activity_leader:options.activity_leader,
          activity_leader_icon:options.activity_leader_icon
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

  },
  uploadimg:function(event){
      wx.showLoading({
          title: '正在上传',
      })
      var that  = this;
          for(var i =0; i < that.data.tempPhotoPath.length;i++ )
          {
              wx.uploadFile({
                  url: 'https://www.monodark.cn/test2-maven/upload/uploadFile4', filePath: that.data.tempPhotoPath[i],
                  name: 'file',
                  formData: {
                      'user': 'test'
                  },
                  method: 'POST',
                  header: {
                      "Content-Type": "multipart/form-data"
                  },
                  success(res)
                  {
                      console.log(res.data);
                      that.data.imggroup = that.data.imggroup.concat(res.data);
                      if(that.data.imggroup.length ==that.data.tempPhotoPath.length  )
                      {
                          wx.request({
                              url: 'https://www.monodark.cn/test2-maven/addActivityLiveImg',
                              data:{
                            activity_id:that.data.activity_id,
                                  activity_live_img:
                                  that.data.imggroup
                              },
                              header: {
                                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                              },
                              method:'POST',
                              success(res){
                                   console.log(res)
                                   if(res.data == 1)
                                   {
                                       wx.showToast({
                                           title: '上传成功！',
                                           icon:'success'
                                       });
                                       wx.redirectTo({
                                           url: '../activityPhoto/activityPhoto?activity_id='+
                                           that.data.activity_id+'&activity_leader='+that.data.activity_leader+'&activity_leader_icon'+
                                           that.data.activity_leader_icon+
                                           '&activity_verified='+that.data.activity_verified,
                                       })
                                       
                                   }
                                   else{
                                       wx.showToast({
                                           title: '上传失败',
                                       })
                                   }
                              },
                              fail(){
                                  wx.showToast({
                                      title: '上传失败',
                                  })
                              }
                          })
                      }

                  }
              })
          }
  }
})