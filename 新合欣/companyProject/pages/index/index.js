const app = getApp()
const checkutils = require('../../common/activityUtils/checkUtils.js')
const upload = require('../../common/activityUtils/upload.js')
const sortActivity = require('../../common/activityUtils/sortActivity.js')

Page({
  data: {
    showPersonModal: false,
    scroll_top: null,
    showModal: true,
    littleScrollLeft: null,
    littleScrollWidth: 200,
    flag: true,
    scrollTemp: null,
    sysInfo: null,
    refreshFlag: false,
    count: 1,
    countnum: 14,
    type: ['知识精英', "经济精英", "艺术精英", "运动精英", '知识精英', "经济精英", "艺术精英", "运动精英", '知识精英', "经济精英", "艺术精英", "运动精英", "经济精英", "艺术精英", "经济精英", "艺术精英", "运动精英", '知识精英', "经济精英", "运动精英", '知识精英', "经济精英", '知识精英', "经济精英", "艺术精英", "运动精英", '知识精英', "经济精英", "艺术精英", "运动精英", '知识精英', "经济精英", "艺术精英", "运动精英", "经济精英", "艺术精英", "经济精英", "艺术精英", "运动精英", '知识精英', "经济精英", "运动精英", '知识精英', "经济精英", '知识精英', "经济精英", "艺术精英", "运动精英", '知识精英', "经济精英", "艺术精英", "运动精英", '知识精英', "经济精英", "艺术精英", "运动精英", "经济精英", "艺术精英", "经济精英", "艺术精英", "运动精英", '知识精英', "经济精英", "运动精英", '知识精英', "经济精英", "艺术精英", "运动精英", '知识精英', "经济精英", "艺术精英", "运动精英", '知识精英', "经济精英", "艺术精英", "运动精英", "经济精英", "艺术精英", "经济精英", "艺术精英", "运动精英", '知识精英', "经济精英", "运动精英", "运动精英", "经济精英", "艺术精英", "经济精英", "艺术精英", "运动精英", '知识精英', "经济精英", "运动精英", '知识精英', "经济精英", "运动精英", "经济精英", "艺术精英", "经济精英", "经济精英", "艺术精英", "经济精英", "经济精英", "艺术精英", "经济精英", "经济精英", "艺术精英", "经济精英", "经济精英", "艺术精英", "经济精英", "经济精英", "艺术精英", "经济精英", "经济精英", "艺术精英", "经济精英", "经济精英", "艺术精英", "经济精英", "经济精英", "艺术精英", "经济精英", "经济精英", "艺术精英", "经济精英", "经济精英", "艺术精英", "经济精英", "经济精英", "艺术精英", "经济精英", "经济精英", "艺术精英", "经济精英", "经济精英", "艺术精英", "经济精英", "艺术精英", "运动精英", '知识精英', "经济精英", "运动精英", '知识精英', "经济精英", ],
    bottom_tips: ["—— 老板别走，我还有！——", "—— 这回真没了！点我回顶部 ——", "—— 别刷了！点我回顶部 ——"],
    current_tip: 0,
    height: app.globalData.menutop + app.globalData.menuButtonRect[1] + 3,
    activity_info: [],
    distance: [],
    topbianjiaoAnimation: app.globalData.showAnimation,
    user_id: null,
    user_OpenID: null,
    middlerow: [{
        name: "高尔夫",
        src: "/images/gaoerfu.png",
        activity_type: "高尔夫"
      },
      {
        name: "保龄球",
        src: "/images/baolingqiu.png",
        activity_type: "保龄球"
      },
      {
        name: "滑翔伞",
        src: "/images/huaxiang.png",
        activity_type: "滑翔伞"

      },
      {
        name: "艺术展",
        src: "/images/zhanlan.png",
        activity_type: "艺术展"

      },
      {
        name: "音乐会",
        src: "/images/yinyue.png",
        activity_type: "音乐会"
      },
      {
        name: "茶艺",
        src: "/images/chayi.png",
        activity_type: "茶艺"
      },
      {
        name: "摄影",
        src: "/images/sheying.png",
        activity_type: "摄影"
      },
      {
        name: "读书",
        src: "/images/dushu.png",
        activity_type: "读书"
      }, {
        name: "书画",
        src: "/images/shuhua.png",
        activity_type: "书画"
      },
      {
        name: "骑术",
        src: "/images/qima.png",
        activity_type: "骑术"
      },
      {
        name: "射箭",
        src: "/images/shejian.png",
        activity_type: "射箭"
      },
      {
        name: "酒会",
        src: "/images/jiuhui.png",
        activity_type: "酒会"
      }
    ],
    typeArray: [{
        name: "交友",
        activity_type: "交友"
      },
      {
        name: "休闲",
        activity_type: "休闲"
      },
      {
        name: "团建",
        activity_type: "团建"
      },
      {
        name: "商务",
        activity_type: "商务"
      }
    ],
    animationInfoData: [],
    tempPhotoPath: [],
    canAddPhoto: true,
    user_type: '政治精英'
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
  //主滑动
  mainscroll: function(e) {
    var that = this

    var topbianjiaoAnimation = that.data.topbianjiaoAnimation
    var showAnimation = app.globalData.showAnimation
    var hideAnimation = app.globalData.hideAnimation

    if (e.detail.scrollTop >= 125 && that.showedtop) {
      that.showedtop = false
      that.setData({
        topbianjiaoAnimation: hideAnimation
      })
    }
    if (e.detail.scrollTop < 125 && !that.showedtop) {
      that.showedtop = true
      that.setData({
        topbianjiaoAnimation: showAnimation
      })
    }

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


  //至顶部
  totop: function() {
    this.setData({
      scroll_top: 0
    })
  },
  /**
   * 底部刷新
   * 分块加载
   * 
   */

  refreshlower: function() {
    if (!this.data.refreshFlag) {
      this.data.refreshFlag = true;

      wx.vibrateShort()
      var that = this;
      var x = Math.ceil(this.data.activity_info.length / this.data.countnum);
      if (this.data.count < x) {
        that.setData({
          count: that.data.count + 1
        })
        that.playAnimation();
      } else {

        if (that.data.current_tip < 2) {
          that.setData({
            current_tip: that.data.current_tip + 1
          })
        }

      }
      setTimeout(function() {
        that.data.refreshFlag = false;
      }, 500)
    }

  },

  /**
   * 中间滚动事件
   */
  // 'scrollLeft/(scrollWidth-screenWidth)=littleScrollLeft/screnn-litwid'
  miniscrollleft: function() {
    var temp = this.data.sysInfo.data.system.indexOf("iOS", 0);
    if (temp == -1) {
      this.setData({
        littleScrollLeft: 0
      })
    }
    wx.vibrateShort({
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  miniscrollright: function() {
    var temp = this.data.sysInfo.data.system.indexOf("iOS", 0);
    if (temp == -1) {
      this.setData({
        littleScrollLeft: app.globalData.screenWidth - this.data.littleScrollWidth
      })
    }
    wx.vibrateShort({
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  scroller: function(e) {
    let that = this;
    var flag = that.data.flag;
    let scrollLeft = e.detail.scrollLeft;
    if (flag) {
      let scrollWidth = e.detail.scrollWidth;
      let screenWidth = app.globalData.screenWidth;
      let littleScrollWidth = that.data.littleScrollWidth;
      that.data.scrollTemp = (scrollWidth - screenWidth) / (screenWidth - littleScrollWidth)
      that.data.flag = false;
    }
    let littleScrollLeft = scrollLeft / that.data.scrollTemp;
    that.setData({
      littleScrollLeft: littleScrollLeft
    })
  },

  onShow: function() {
    this.showedtop = true
    console.log("show")
    var that = this;
    wx.checkSession({
      success() {
        that.setData({
          showModal: false
        }) //ssion_key 未过期，并且在本生命周期一直有效


      },
      fail() {
        that.setData({
          showModal: true
        })
      }
    });
  },
  refresh: function() {
    var that = this;
    if (that.data.refreshFlag) {
      return
    }
    that.data.refreshFlag = true;
    wx.vibrateShort();
    console.log("refresh")
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://hd.huining888.com/test2-maven/selectAllNotStartActivityInfo',
      method: "post",
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
                  count: 1,
                  current_tip: 0
                })
                that.playAnimation();
                wx.hideLoading();
              }
            })
          },
          fail: function(res) {
            wx.showToast({
              title: '获取地理位置失败',
              icon: 'none',
              
            })
            wx.hideLoading()
            that.setData({
              activity_info:activitys,
              count: 1,
              current_tip: 0
            })
            that.playAnimation()
          },
          complete: function(res) {},
        })



      }
    })
    setTimeout(function() {
      that.data.refreshFlag = false;
    }, 2000)
  },
  //监听下拉刷新
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh()
  },
  onReady: function() {

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
        console.log(e)
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
            app.globalData.userInfo = res.data
            app.globalData.islogin = true
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
  },
  toSortActivity: function(event) {
    wx.navigateTo({
      url: '../sortActivity/sortActivity?pagename=' +
        event.currentTarget.dataset.pagename +
        '&activity_type=' +
        event.currentTarget.dataset.activitytype
    })
  },
  onLoad: function() {
    console.log("load")
    var that = this;
    wx.getStorage({
      key: 'sysInfo',
      success: function(res) {
        that.setData({
          sysInfo: res
        })
      },
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


              },
              fail: function(res) {},
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
    this.refresh()
  },
  playAnimation: function() {
    var that = this;
    app.fadeInInfo(that.data.count * that.data.countnum);
    var animationInfoData = [];
    animationInfoData = app.globalData.animationInfoData;
    for (let i = 0; i < (that.data.count - 1) * that.data.countnum; i++) {
      animationInfoData[i] = null;
    }

    that.setData({
      animationInfoData: animationInfoData
    })
    console.log(that.data.animationInfoData);


  },
  candidate: function() {
    wx.navigateTo({
      url: '../creativeCandidate/creativeCandidate',
    })
  },
  league: function() {
    wx.navigateTo({
      url: '../unionCooperation/unionCooperation',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  dash: function() {
    wx.navigateTo({
      url: '../shiningDash/shiningDash',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})