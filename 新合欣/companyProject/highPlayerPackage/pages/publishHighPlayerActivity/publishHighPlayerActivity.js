// pages/activityEdit/activityEdit.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activityDetail: '点我编辑活动介绍',

    activity_describe: [{
      status: false,
      title: "联系方式",
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
    }, ],
    user_OpenID: null,
    showModal: false,
    activity_type: "未选择",
    activity_title: null,
    activity_population: '',
    activity_start_date: "YYYY-MM-DD",
    activity_date: "YYYY-MM-DD",
    activity_date_deadline: "YYYY-MM-DD",
    activity_time: "00:00",
    activity_time_deadline: "00:00",
    activity_content: null,
    activity_img: ["/images/publicImage.png"],
    showtip: false,
    activity_adress: null,
    activity_verified: null,
    activity_latitude: null,
    activity_longitude: null,
    activity_leader: null,
    activity_payment: "",
    user_avatarUrl: null,
    official: null,
    activity_leader_icon: null,
    user_verified: null,
    tempPhotoPath: [],
    canAddPhoto: true,
    activity_present_population: 0,
    agree: true,
    imggroup: [],
    ishidden: false,
    pathlength: null
  },
  toActivityEditor: function() {
    wx.navigateTo({
      url: '../../../pages/activityEditor/activityEditor',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  pushTitle: function(e) {
    let idx = e.currentTarget.dataset.idx;
    let array = this.data.activity_describe;
    array[idx].title = e.detail.value;
    this.data.activity_describe = array

  },
  pushContent: function(e) {
    let idx = e.currentTarget.dataset.idx;
    let array = this.data.activity_describe;
    array[idx].content = e.detail.value;
    this.data.activity_describe = array
  },
  deleteItem: function(e) {
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
  population: function(e) {
    this.data.activity_population = e.detail.value
  },
  payment: function(e) {
    this.data.activity_payment = e.detail.value
  },
  adress: function(e) {

    this.data.activity_adress = e.detail.value

  },

  title: function(e) {

    this.data.activity_title = e.detail.value

  },
  additem: function() {
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
  bindTypeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    this.setData({

      activity_type: this.data.typeArray[e.detail.value].type
    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      activity_start_date: e.detail.value
    })
  },
  bindStartDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);

    this.setData({
      activity_date: e.detail.value
    })
  },
  bindEndDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);

    this.setData({
      activity_date_deadline: e.detail.value
    })
  },
  bindStartTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);

    this.setData({
      activity_time: e.detail.value
    })
  },
  bindEndTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      activity_time_deadline: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('onload')
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        that.setData({
          activity_latitude: res.latitude,
          activity_longitude: res.longitude
        })
      }
    });
    wx.login({
      success(res) {
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
            that.setData({
              user_nickName: res.data.user_nickName,
              user_avatarUrl: res.data.user_avatarUrl,
              user_OpenID: res.data.user_OpenID,
              user_verified: res.data.user_verified,
              activity_verified: res.data.user_verified,
              activity_leader: res.data.user_nickName,
              activity_leader_icon: res.data.user_avatarUrl
            });
          }
        })
      }
    })


    wx.getStorage({
      key: 'publishHighPlayer',
      success: function(res) {
        console.log(res)
        app.globalData.activityEdit = res.data.activity_content
        //console.log(app.globalData.activityEdit + ' ' + res.data.activity_content)
        that.setData({
          activity_content: res.data.activity_content,
          activity_title: res.data.activity_title,
          activity_type: res.data.activity_type,
          activity_population: res.data.activity_population,
          activity_payment: res.data.activity_payment,
          activity_start_date: res.data.activity_start_date,
          activity_date: res.data.activity_date,
          activity_time: res.data.activity_time,
          activity_date_deadline: res.data.activity_date_deadline,
          activity_time_deadline: res.data.activity_time_deadline,
          activity_adress: res.data.activity_adress,
          activity_latitude: res.data.activity_latitude,
          activity_longitude: res.data.activity_longitude,
          activity_describe: res.data.activity_describe,
          activity_leader: res.data.activity_leader,
          user_avatarUrl: res.data.user_avatarUrl,
          activity_present_population: res.data.activity_present_population,
        })
      },
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
    console.log('onshow')
    var that = this
    console.log('debug' + app.globalData.activityEdit)
    this.data.activity_content = app.globalData.activityEdit
    if (this.data.activity_content != null) {
      that.setData({
        activityDetail: '活动介绍编辑完成'
      })
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
    var that = this;
    // wx.showModal({
    //   title: '',
    //   content: '是否保存草稿',
    //   showCancel: true,
    //   cancelText: '不保存',
    //   cancelColor: '',
    //   confirmText: '保存',
    //   confirmColor: '',
    //   success: function(res) {
    //     if(res.confirm){
    //       console.log('点击确认')
    //     }
    //     if(res.cancel){
    //       console.log('点击取消')
    //     }
    //   },
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })

    wx.setStorage({
      key: 'publishHighPlayer',
      data: {
        activity_title: that.data.activity_title,
        activity_type: that.data.activity_type,
        activity_population: that.data.activity_population,
        activity_payment: that.data.activity_payment,
        activity_start_date: that.data.activity_start_date,
        activity_date: that.data.activity_date,
        activity_time: that.data.activity_time,
        activity_date_deadline: that.data.activity_date_deadline,
        activity_time_deadline: that.data.activity_time_deadline,
        activity_adress: that.data.activity_adress,
        activity_latitude: that.data.activity_latitude,
        activity_longitude: that.data.activity_longitude,
        activity_content: app.globalData.activityEdit,
        activity_describe: that.data.activity_describe,
        activity_leader: that.data.activity_leader,
        user_avatarUrl: that.data.user_avatarUrl,
        activity_verified: that.data.user_verified,
        activity_present_population: that.data.activity_present_population,
      }
    });
    app.globalData.activityEdit=null


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
  chooseImage: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          activity_img: tempFilePaths,
          showtip: true
        })
      },
    })
  },
  chooselocate: function() {
    console.log("chooselocate")
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res)
        that.setData({
          activity_adress: res.name,
          activity_latitude: res.latitude,
          activity_longitude: res.longitude
        })
      },
    })
  },
  textareafocus: function() {
    this.setData({
      textareaHeight: '40vw'
    })
  },
  textareablur: function() {
    this.setData({
      textareaHeight: '15vw'
    })
  },
  publish: function() {
    var that = this;


    if ((that.data.activity_title == null) || (that.data.activity_start_date == "YYYY-MM-DD") || (that.data.activity_date == "YYYY-MM-DD") || (that.data.activity_date_deadline == "YYYY-MM-DD") || (that.data.activity_content == null) || (that.data.activity_img[0] == "/images/publicImage.png") || (that.data.activity_population == '')) {
      wx.showToast({
        title: '信息不完整',
        icon: 'none',
        duration: 1000,
        mask: false,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      return
    };
    if (that.data.activity_population <= 2) {
      wx.showToast({
        title: '人数不能小于2人',
        icon: 'none',

      })
      return
    }
    wx.showLoading({
      title: '活动发布中',
      mask: true
    });
    
    // if (that.data.activity_payment == '') {
    //   that.data.activity_payment = 0
    // }
    that.setData({
      ishidden: true
    });

    console.log("photopath")
    that.setData({
      pathlength: that.data.activity_img.length
    })

    var successCount = 0;

    //上传封面图
    wx.uploadFile({
      url: 'https://www.monodark.cn/test2-maven/upload/uploadFile4',
      filePath: that.data.activity_img[0],
      name: 'file',
      formData: {
        'user': 'test'
      },
      method: 'POST',
      header: {
        "Content-Type": "multipart/form-data"
      },
      success(res) {
        successCount++;
        that.data.activity_img[0] = res.data
        if (successCount == that.data.tempPhotoPath.length + 1) {

          that.insertActivity()
        }
      }
    })
    //上传详情图
    for (var i = 0; i < that.data.tempPhotoPath.length; i++) {
      wx.uploadFile({
        url: 'https://www.monodark.cn/test2-maven/upload/uploadFile4',
        filePath: that.data.tempPhotoPath[i],
        name: 'file',
        formData: {
          'user': 'test'
        },
        method: 'POST',
        header: {
          "Content-Type": "multipart/form-data"
        },
        success(res) {
          successCount++;
          console.log("??????")
          console.log(res.data)
          that.data.imggroup = that.data.imggroup.concat(res.data)
          if (successCount == that.data.tempPhotoPath.length + 1) {
            that.insertActivity()
          }
        }
      });

    }
  },
  insertActivity: function() {
    var that = this
    that.data.imggroup = that.data.activity_img.concat(that.data.imggroup)
    wx.getStorage({
      key: 'userinfo',
      success(res) {
        that.setData({
          user_OpenID: res.data.user_OpenID,
          activity_leader: res.data.user_nickName,
          user_avatarUrl: res.data.user_avatarUrl,
          user_verified: res.data.user_verified
        })
        console.log("success")
      },
      fail() {
        console.log("fail");
      }
    });
    console.log("imgpath")
    console.log(that.data.imggroup)
    console.log(that.data.activity_population)
    console.log(that.data.activity_describe)
    console.log(that.data.activity_start_date)
    console.log(that.data.activity_date)
    console.log(that.data.activity_time)
    console.log(that.data.activity_date_deadline)
    console.log(that.data.activity_time_deadline)
    console.log(that.data.activity_adress)
    console.log(that.data.activity_latitude)
    console.log(that.data.activity_longitude)
    console.log(that.data.activity_content)
    console.log(that.data.activity_title)
    console.log(that.data.user_OpenID)
    wx.request({
      url: 'https://www.monodark.cn/test2-maven/insertAdvancedPlayersActivityInfo', //仅为示例，并非真实的接口地址        
      data: {
        activity_title:that.data.activity_title,
        user_OpenID: that.data.user_OpenID,
        activity_img: that.data.imggroup,
        activity_type: 'advanced',
        activity_population: that.data.activity_population,
        activity_sign_up_end_time: that.data.activity_start_date,
        activity_start_time: that.data.activity_date + ' ' + that.data.activity_time,
        activity_end_time: that.data.activity_date_deadline + ' ' + that.data.activity_time_deadline,
        activity_adress: that.data.activity_adress,
        activity_latitude: that.data.activity_latitude,
        activity_longitude: that.data.activity_longitude,
        activity_content: that.data.activity_content,
        activity_describe: JSON.stringify(that.data.activity_describe),
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data)
        wx.hideLoading();
        that.setData({
          ishidden: false
        });

        app.globalData.activityEdit = null;
        wx.navigateBack({
          delta: 1,
        })
        wx.showToast({
          title: '活动发布成功',
          icon: 'success',
          duration: 2000
        });
        wx.removeStorage({
          key: 'publishHighPlayer',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })


      },
      fail(res) {
        wx.hideLoading();
        wx.showToast({
          title: '活动发布失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  topreviewActivity: function(event) {
    var that = this;
    
    console.log(event.currentTarget.dataset)
    wx.navigateTo({
      url: '../../../pages/previewActivity/previewActivity?' +
        'activity_id=' + event.currentTarget.dataset.activityid +
        '&activity_title=' +
        event.currentTarget.dataset.activitytitle +
        '&activity_population=' +
        event.currentTarget.dataset.activitypopulation +
        '&activity_img=' +
        event.currentTarget.dataset.activityimg +
        '&activity_adress=' +
        event.currentTarget.dataset.activityadress +
        '&activity_start_date=' +
        event.currentTarget.dataset.activitystartdate +
        '&activity_date=' +
        event.currentTarget.dataset.activitydate +
        '&activity_date_deadline=' +
        event.currentTarget.dataset.activitydatedeadline +
        '&activity_time=' +
        event.currentTarget.dataset.activitytime +
        '&activity_time_deadline=' +

        event.currentTarget.dataset.activitytimedeadline +
        '&activity_content=' +
        event.currentTarget.dataset.activitycontent +
        '&activity_type=' +
        event.currentTarget.dataset.activitytype +
        '&activity_verified=' +
        that.data.activity_verified +
        '&activity_latitude=' +
        that.data.activity_latitude +
        '&activity_longitude=' +
        that.data.activity_longitude +
        '&activity_describe=' +
        JSON.stringify(that.data.activity_describe) +


        '&activity_leader_icon=' +
        that.data.activity_leader_icon +
        '&activity_leader=' +
        that.data.activity_leader +
        '&activity_present_population=' +
        that.data.activity_present_population
    });
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
    let length = 5 - (that.data.tempPhotoPath.length);
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      count: length,
      success: function(res) {
        that.setData({
          tempPhotoPath: that.data.tempPhotoPath.concat(res.tempFilePaths)
        })
        if (that.data.tempPhotoPath.length == 5) {
          that.setData({
            canAddPhoto: false
          })
          console.log(that.data.canAddPhoto);
        }
      },
    })
  },
  checkchange: function() {
    this.data.agree = !this.data.agree;
  },
  touserAgreement: function() {
    wx.navigateTo({
      url: '../userAgreement/userAgreement',
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
            app.globalData.userInfo = res.data
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