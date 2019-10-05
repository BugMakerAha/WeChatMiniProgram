// pages/sortActivity/sortActivity.js
const app = getApp()
const checkutils = require('../../common/activityUtils/checkUtils.js')
const upload = require('../../common/activityUtils/upload.js')
const sortActivity = require('../../common/activityUtils/sortActivity.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activity_info: [],
    pagename: "",
    searchFocus: false,
    searchWidth: 14,
    activity_type: null,
    pageEnglish: null,
    user_type: '政治精英',
    showPersonModal: false,
    tempPhotoPath: [],
    canAddPhoto: true,
    distance: []
  },
  searchFocus: function() {
    this.setData({
      searchFocus: true
    })

  },
  //搜索框得到焦点
  hasfocus: function() {
    this.setData({
      searchWidth: 75
    })
  },
  //搜索框失去焦点
  losefocus: function() {
    this.setData({
      searchWidth: 14
    })
  },
  // 点击搜索事件
  searchEvent: function() {

  },
  getPageEnglish: function(name) {
    var that = this;
    if (name === '高尔夫') {
      that.setData({
        pageEnglish: 'Golf'
      })
      return
    }
    if (name === '保龄球') {
      that.setData({
        pageEnglish: 'Bowling'
      })
      return
    }
    if (name === '滑翔伞') {
      that.setData({
        pageEnglish: 'Paraglider'
      })
      return
    }
    if (name === '艺术展') {
      that.setData({
        pageEnglish: 'Exhibition'
      })
      return
    }
    if (name === '音乐会') {
      that.setData({
        pageEnglish: 'Concert'
      })
      return
    }
    if (name === '茶艺') {
      that.setData({
        pageEnglish: 'Tea Art'
      })
      return
    }
    if (name === '摄影') {
      that.setData({
        pageEnglish: 'Photography'
      })
      return
    }
    if (name === '读书') {
      that.setData({
        pageEnglish: 'Read'
      })
      return
    }
    if (name === '书画') {
      that.setData({
        pageEnglish: 'Painting'
      })
      return
    }
    if (name === '骑术') {
      that.setData({
        pageEnglish: 'Riding'
      })
      return
    }
    if (name === '射箭') {
      that.setData({
        pageEnglish: 'Archery'
      })
      return
    }
    if (name === '酒会') {
      that.setData({
        pageEnglish: 'Reception'
      })
      return
    }
    if (name === '交友') {
      that.setData({
        pageEnglish: 'Friends'
      })
      return
    }
    if (name === '休闲') {
      that.setData({
        pageEnglish: 'Leisure'
      })
      return
    }
    if (name === '团建') {
      that.setData({
        pageEnglish: 'Group'
      })
      return
    }
    if (name === '商务') {
      that.setData({
        pageEnglish: 'Business'
      })
      return
    }
  },
  getDistance: function(obj) {
    var that = this
    app.getDistance({
      activitys: obj.data,
      success: function(res) {
        console.log(res)
        //that.data.distance = res.distance
        obj.success(res)

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log(options)
    this.setData({
      pagename: options.pagename,
      activity_type: options.activity_type
    });
    that.getPageEnglish(options.pagename);
    console.log(that.data.activity_type)
    wx.request({
      url: 'https://www.monodark.cn/test2-maven/selectActivityInfoListByActivityTypeListOnlyEnterpriseActivity',
      method: 'POST',
      data: {
        activity_type: that.data.activity_type
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },

      success(res) {

        console.log(res.data)
        var activitys = res.data
        wx.getLocation({
          type: 'wgs84',
          success: function(res) {
            app.globalData.latitude = res.latitude
            app.globalData.longitude = res.longitude
            that.getDistance({
              data: activitys,
              success: function(res) {
                //按距离排序
                sortActivity.sortByDistance({
                  data: res.activitys
                })
                console.log(res)
                that.setData({
                  activity_info: res.activitys,
                  
                })
                
                wx.hideLoading();
              }
            })
          },
          fail: function(res) {},
          complete: function(res) {},
        })



      }



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
  //个人认证提交
  submitPerson: function(e) {
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
      success: function(res) {
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
          success: function(res) {
            console.log(res)
            if (res.data == '1') {
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                image: '',
                duration: 500,
                mask: true,
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
              })
              that.setData({
                showPersonModal: false
              })
            } else {
              wx.showToast({
                title: '提交失败',
                icon: 'none',
                duration: 500,
              })
            }

          },
          fail: function(res) {},
          complete: function(res) {},
        })
      }
    })




  },
  toperson: function() {
    this.setData({
      showPersonModal: false
    })
    wx.navigateTo({
      url: '../personalCertification/personalCertification?showmodal=true',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })

  },
  closePersonModal: function() {
    this.setData({
      showPersonModal: false
    })
  },
  //个人认证照片删除
  deletePhoto: function(e) {
    var that = this;
    let index = e.currentTarget.dataset.index;
    let array = that.data.tempPhotoPath;
    array.splice(index, 1);
    that.setData({
      tempPhotoPath: array,
      canAddPhoto: true
    })
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
    let length = 3 - (that.data.tempPhotoPath.length);
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      count: length,
      success: function(res) {
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
  radiochange: function(e) {
    this.data.user_type = e.detail.value
    console.log(e)
  },
  toActivityInfo: function(event) {
    var that = this
    checkutils.checkPersonCertification({
      user_id: app.globalData.userInfo.user_id,
      success: function(res) {
        console.log(res)
        if (res == -1) {
          //未提交申请
          that.setData({
            showPersonModal: true
          })
          return
        } else if (res == 0) {
          wx.showModal({
            title: '提示',
            content: '您的信息正在审核中',
            showCancel: true,
            cancelText: '关闭',
            confirmText: '查看进度',
            success: function(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../personalCertification/personalCertification',
                  success: function(res) {},
                  fail: function(res) {},
                  complete: function(res) {},
                })
              }
            },
            fail: function(res) {},
            complete: function(res) {},
          })
        } else if (res == 1) {
          //审核通过
          console.log(event.currentTarget.dataset)
          wx.navigateTo({
            url: '../activityInfo/activityInfo?' +
              'activity_id=' + event.currentTarget.dataset.activityid

          })
        } else if (res == 2) {
          wx.showModal({
            title: '提示',
            content: '您的个人审核未通过',
            showCancel: true,
            cancelText: '关闭',
            confirmText: '重新审核',
            success: function(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../personalCertification/personalCertification',
                  success: function(res) {},
                  fail: function(res) {},
                  complete: function(res) {},
                })
              }
            },
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      }
    })

  }
})