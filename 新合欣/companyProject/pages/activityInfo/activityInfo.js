// pages/activityInfo/activityInfo.js
const app = getApp()
const checkutils = require('../../common/activityUtils/checkUtils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_detail: null,
    collected: false,
    showModal: false,
    user_icon: null,
    persons: null,
    user_OpenID: null,
    apply_state: "申请加入",
    isapply: false,
    previewImage: [],
    isfull: false,
    editorReadyed: false,
    getContentReadyed: false,
    editorCtx: null,
    topbianjiaoAnimation: null,
    readonly: false
  },
  //主滑动
  mainscroll: function(e) {
    var that = this

    var topbianjiaoAnimation = that.data.topbianjiaoAnimation
    var showAnimation = app.globalData.showAnimation
    var hideAnimation = app.globalData.hideAnimation

    if (e.detail.scrollTop >= 240 && that.showedtop) {
      that.showedtop = false
      that.setData({
        topbianjiaoAnimation: hideAnimation
      })
    }
    if (e.detail.scrollTop < 240 && !that.showedtop) {
      that.showedtop = true
      that.setData({
        topbianjiaoAnimation: showAnimation
      })
    }

  },
  oneditorready: function() {
    var that = this
    wx.createSelectorQuery().select('#editor2').context(function(res) {
      that.data.editorCtx = res.context
      console.log('editorReady')
      that.data.editorReadyed = true;
      if (that.data.editorReadyed && that.data.getContentReadyed) {
        that.data.editorCtx.setContents({
          html: that.data.activity_detail.activity_content,
          success: function(res) {
            that.setData({
              readonly: true
            })
          },
          fail: function(res) {}
        })
      }

    }).exec()
  },
  /**
   * 收藏
   */
  collect: function() {
    var that = this;
    if (this.data.collected) {
      wx.showLoading({
        mask: true,
        title: '取消收藏中',
      })
      wx.request({
        url: 'https://www.monodark.cn/test2-maven/delectActivityFav',
        data: {
          activity_id: that.data.activity_id,
          user_OpenID: that.data.user_OpenID
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          wx.hideLoading();
          console.log(res);
          that.setData({
            collected: false
          })
          wx.showToast({
            title: '取消收藏成功',
            icon: "success"
          })
        }
      })

    } else {
      console.log(that.data.activity_id)
      console.log(that.data.user_OpenID)
      wx.showLoading({
        title: '收藏中',
        mask: true
      })
      wx.request({
        url: 'https://www.monodark.cn/test2-maven/insertActivityFavInfo',
        data: {
          activity_id: that.data.activity_id,
          user_OpenID: that.data.user_OpenID
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          console.log(res)
          wx.hideLoading();
          //success
          that.setData({
            collected: true
          })
          wx.showToast({
            title: '收藏成功',
            icon: "success"
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    console.log(options)
    that.setData({
      activity_id: options.activity_id,
    });
    wx.request({
      url: 'https://www.monodark.cn/test2-maven/selectActivityInfoByActivityId',
      data: {
        activity_id: options.activity_id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        res.data.activity_img = JSON.parse(res.data.activity_img)
        if (res.data.activity_describe) {
          res.data.activity_describe = JSON.parse(res.data.activity_describe)
        }
        that.setData({
          activity_detail: res.data
        })
        console.log('getcontentReady')
        that.data.getContentReadyed = true;
        if (that.data.editorReadyed && that.data.getContentReadyed) {
          that.data.editorCtx.setContents({
            html: that.data.activity_detail.activity_content,
            // success: function (res) {
            //   that.setData({
            //     readonly: true
            //   })
            // },
            fail: function(res) {}
          })
        }
        console.log(res)
        //获取分享图片
        that.selectComponent("#myCanva").drawImg({
          img: that.data.activity_detail.activity_img[0],
          success: function (res) {
            console.log(res)
            that.data.shareimg = res
          }
          
        })
      }

    })
    wx.checkSession({
      success() {
        that.setData({
          showModal: false
        }) //session_key 未过期，并且在本生命周期一直有效

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
              success: function(res) {
                console.log(res)
                app.globalData.userInfo = res.data
                //是否收藏
                wx.request({
                  url: 'https://www.monodark.cn/test2-maven/selectActivityFavIsexist',
                  data: {
                    activity_id: that.data.activity_id,
                    user_OpenID: res.data.user_OpenID
                  },
                  method: "POST",
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success(res) {
                    console.log(res)
                    that.setData({
                      collected: res.data
                    })
                  },
                  fail: function() {
                    wx.showToast({
                      title: '获取收藏状态失败',
                      icon: 'none',

                    })
                  }
                })


              },
              fail: function(res) {
                wx.showToast({
                  title: '获取用户信息失败',
                  icon: 'none',

                })
              },
              complete: function(res) {},
            })

          },

        })
      },
      fail() {
        that.setData({
          showModal: true
        })
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
    this.showedtop = true
    var that = this;
    wx.checkSession({
      success() {
        that.setData({
          showModal: false
        }) //ssion_key 未过期，并且在本生命周期一直有效

        wx.request({
          url: 'https://www.monodark.cn/test2-maven/selectActivityMemberListByActivityId',
          method: 'POST',
          data: {
            activity_id: that.data.activity_id
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            console.log(res);
            that.setData({
              persons: res.data
            })
          }
        });

        wx.request({
          url: 'https://www.monodark.cn/test2-maven/selectActivityApplyState',
          method: 'POST',
          data: {
            user_OpenID: that.data.user_OpenID,
            activity_id: that.data.activity_id
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            console.log("status")
            console.log(res.data)
            if (that.data.activity_detail.activity_present_population != that.data.activity_detail.activity_population) {


              if (res.data == "无请求状态") {
                that.setData({
                  isapply: false,
                  apply_state: "申请加入"
                })
              } else if (res.data == "获取请求状态失败") {
                that.setData({
                  isapply: true,
                  apply_state: "申请已被拒绝"
                })
              } else if (res.data == "请求通过") {
                that.setData({
                  isapply: true,
                  apply_state: "已加入"
                })
              } else {
                that.setData({
                  isapply: true,
                  apply_state: "等待同意"
                })
              }
            } else {
              that.setData({
                apply_state: '人数已满',
                isapply: true
              })
            }
          }
        });

      },
      fail() {
        that.setData({
          showModal: true
        })
      }
    });

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


  apply: function() {
    var that = this
    if (that.data.user_OpenID == that.data.activity_detail.user_OpenID) {
      wx.showToast({
        title: '不能申请自己发起的活动哦',
        icon: 'none'
      })
      return
    }
    checkutils.checkActivityStateById({
      activity_id: that.data.activity_detail.activity_id,
      success: function(res) {
        if (res == -1 || res == 2 || res == 4) {
          wx.showToast({
            title: '该活动已失效！',
            icon: 'none'
          })
        }
        if (res == 1) {
          wx.showToast({
            title: '该活动已经停止报名啦！',
            icon: 'none'
          })
        }
        if (res == 3) {
          wx.showToast({
            title: '该活动正在审核中！',
            icon: 'none'
          })
        }
        if (res == 0) {
          if (!that.data.isapply) {
            wx.navigateTo({
              url: '../activityApply/activityApply?activity_id=' +
                that.data.activity_detail.activity_id +
                '&user_OpenID=' + that.data.user_OpenID +
                '&user_avatarUrl=' + that.data.user_avatarUrl +
                '&apply_user_type=申请人' +
                '&sponsor_user_OpenID=' + that.data.activity_detail.user_OpenID +
                '&sponsor_user_avatarUrl=' + that.data.activity_detail.user_avatarUrl +
                '&activity_title=' + that.data.activity_detail.activity_title +
                '&activity_img=' + that.data.activity_detail.activity_img[0] +
                '&apply_state=正在请求' + '&activity_verified=' +
                that.data.activity_detail.activity_verified
            })
          } else {
            wx.showToast({
              title: that.data.apply_state,
              icon: 'none'
            })
          }
        }
      }
    })




  },
  onShareAppMessage: function(res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    console.log('debug')
    return {
      title: that.data.activity_detail.activity_title,
      imageUrl: that.data.shareimg,
      path: '/pages/activityInfo/activityInfo?' +
        'activity_id=' +
        that.data.activity_detail.activity_id

    }


  },
  refresh: function() {
    wx.vibrateShort();
  },
  toactivityPhoto: function() {
    var that = this;
    wx.navigateTo({
      url: '../activityPhoto/activityPhoto?activity_leader_icon=' + that.data.activity_detail.user_avatarUrl +
        '&activity_leader=' + that.data.activity_detail.activity_leader +
        '&activity_verified=' + that.data.activity_detail.activity_verified +
        '&activity_id=' + that.data.activity_id
    })
  },
  preview: function(event) {
    var index = event.currentTarget.dataset.index
    var that = this;
    wx.previewImage({
      urls: that.data.activity_detail.activity_img,
      current: that.data.activity_detail.activity_img[index]
    })
  },
  login: function(e) {
    var that = this;
    console.log(e.detail.userInfo);
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