// pages/personalCertification/personalCertification.js
const app = getApp()
const checkutils = require('../../common/activityUtils/checkUtils.js')
const upload = require('../../common/activityUtils/upload.js')


Page({
  
  data: {
    tempPhotoPath: [],
    canAddPhoto: true,
    personCertificationState:-1,
    user_type: '政治精英',
    showPersonModal:false

  },
  closemodal: function () {
    this.setData({
      showPersonModal: false
    })
  }, showmodal: function () {
    this.setData({
      showPersonModal: true
    })
  },
  restart:function(){
    this.setData({
      personCertificationState: 0
    })
  },
  onLoad:function(option){
    var that = this
    if(option.showmodal){
      this.setData({
        showPersonModal:true
      })
    }
    wx.login({
      success: function(res) {
        wx.request({
          url: 'https://www.monodark.cn/test2-maven/getUserInfoByCode',
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'post',
          success: function (res) { 
            checkutils.checkPersonCertification({
              user_id: res.data.user_id,
              success: function (res) {
                console.log(res)
                if (res == -1) {
                  //未提交申请
                  that.setData({
                    personCertificationState: 0
                  })
                  return
                } else if (res == 0) {
                  //审核中
                  that.setData({
                    personCertificationState: 1
                  })
                } else if (res == 1) {
                  //审核通过
                  that.setData({
                    personCertificationState: 2
                  })
                } else if (res == 2) {
                  that.setData({
                    personCertificationState:3
                  })
                }
              }
            })

          },
          fail: function (res) { },
          complete: function (res) { },
        })

      },
      fail: function(res) {},
      complete: function(res) {},
    })
    
   
  }
  ,
  submitPerson: function (e) {
    if (this.data.tempPhotoPath.length == 0) {
      wx.showToast({
        title: '信息不完整',
        icon: 'none',
        duration: 500
      })
      return
    }
    var that = this
    var user_type = that.data.user_type
    upload.uploadPhoto({
      filePaths: that.data.tempPhotoPath,
      success: function (res) {
        console.log(res)
        console.log("上传照片成功")
        wx.request({
          url: 'https://www.monodark.cn/test2-maven/insertUserApproveInfo',
          data: {
            user_id: app.globalData.userInfo.user_id,
            user_OpenID: app.globalData.userInfo.user_OpenID,
            user_type: user_type,
            user_approve_img: res
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res)
            if (res.data == '1') {
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                image: '',
                duration: 500,
                mask: true,
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
              that.setData({
                personCertificationState:1
              })
            } else {
              wx.showToast({
                title: '提交失败',
                icon: 'none',
                duration: 500,
              })
            }

          },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    })




  },
  deletePhoto: function (e) {
    var that = this;
    let index = e.currentTarget.dataset.index;
    let array = that.data.tempPhotoPath;
    array.splice(index, 1);
    that.setData({
      tempPhotoPath: array,
      canAddPhoto: true
    })
  },
  preview: function (e) {
    var that = this;
    let index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: that.data.tempPhotoPath[index],
      urls: that.data.tempPhotoPath,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  getPhoto: function () {
    var that = this;
    let length = 3 - (that.data.tempPhotoPath.length);
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      count: length,
      success: function (res) {
        that.setData({
          tempPhotoPath: that.data.tempPhotoPath.concat(res.tempFilePaths)
        })
        if (that.data.tempPhotoPath.length == 3) {
          that.setData({
            canAddPhoto: false
          })
          console.log(that.data.canAddPhoto);
        }
      },
    })
  },
  radiochange: function (e) {
    this.data.user_type = e.detail.value
    console.log(e)
  }
})
