// pages/sortUser/sortUser.js
const app = getApp()
const checkutils = require('../../common/activityUtils/checkUtils.js')
const upload = require('../../common/activityUtils/upload.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempPhotoPath: [],
    canAddPhoto: true,
    showModal: true,
    official: false,
    user_verified: null,
    showPersonModal: false,
    user_type: '政治精英'
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.checkSession({
      success() {
        that.setData({
          showModal: false
        }) 
        app.globalData.islogin = true
        //session_key 未过期，并且在本生命周期一直有效    
        wx.login({
          success(res) {
            wx.showLoading({
              title: '',
              mask: true,
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
            wx.request({
              url: 'https://www.monodark.cn/test2-maven/getUserInfoByCode',
              data: {
                code: res.code
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'post',
              success(res) {
                app.globalData.userInfo = res.data

                wx.hideLoading();
              },
              fail(){
                wx.showToast({
                  title: '获取用户信息失败',
                  icon: 'none',
                })
                wx.hideLoading()
              }
            })
          }
        })
      },
      fail() {
        that.setData({
          showModal: true
        })
        app.globalData.islogin=false
      }
    });


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
    var that = this
    if (app.globalData.islogin) {
      that.setData({
        showModal:false
      })

      if (!this.data.official) {
        wx.login({
          success(res) {
            wx.showLoading({
              title: '',
              mask: true,
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
            checkutils.checkAllianceState({

              success(res) {
                if (res == 1) {
                  that.data.official = true
                } else if (res == 0) {
                  that.data.official = false
                }
                wx.hideLoading();
              }
            })
          }
        })
      }
    }

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

  tounion: function() {
    console.log("sss");
  },
  topublishActivity: function() {
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

          wx.navigateTo({
            url: '../publishActivity/publishActivity?official=' + 'fales'
          });
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



    wx.vibrateShort({})

  },
  toofficialpublishActivity: function() {
    wx.vibrateShort({});
    var that = this;
    console.log(that.data.official)
    if (that.data.official) {
      wx.navigateTo({
        url: '../publishActivity/publishActivity?official=' + that.data.official

      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先加入昱奢商业联盟',
        showCancel: true,
        cancelText: '返回逛逛',
        confirmText: '查看申请',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../payForAlliance/payForAlliance',
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
            if (res.cancel) {

            }
          }
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  login: function(e) {
    var that = this;
    console.log(e.detail.userInfo);
    if (!e.detail.userInfo) {
      wx.showToast({
        title: '获取用户信息失败',
        icon: 'none',
        image: '',
        duration: 500,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      return
    }
    wx.login({
      success(res) {
        console.log(res.code);
        wx.request({
          url: 'https://www.monodark.cn/test2-maven/loginByWeiXing',
          data: {
            code: res.code,
            nickName: e.detail.userInfo.nickName,
            avatarUrl: e.detail.userInfo.avatarUrl,
            gender: e.detail.userInfo.gender,
            language: e.detail.userInfo.language,
            province: e.detail.userInfo.province,
            country: e.detail.userInfo.country,
            city: e.detail.userInfo.city
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'post',
          success(res) {
            console.log(res.data)
            console.log(res.data.user_nickName)
            wx.setStorage({
              key: "userinfo",
              data: {
                user_id: res.data.user_id,
                user_nickName: res.data.user_nickName,
                user_avatarUrl: res.data.user_avatarUrl,
                user_gender: res.data.user_gender,
                user_language: res.data.user_language,
                user_province: res.data.user_province,
                user_country: res.data.user_country,
                user_city: res.data.user_city,
                user_OpenID: res.data.user_OpenID,
                user_verified: res.data.user_verified,
                user_activity_detail_count: res.data.user_activity_detail_count,
                user_activity_fav_count: res.data.user_activity_fav_count,
                user_apply_count: res.data.user_apply_count
              }
            });
          },
          fail() {
            wx.showToast({
              title: '登录失败',
            })
          }
        })
        that.setData({
          showModal: false
        })
      }
    })
  }
})