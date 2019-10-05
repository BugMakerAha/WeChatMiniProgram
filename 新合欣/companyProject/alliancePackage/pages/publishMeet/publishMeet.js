// pages/activityEdit/activityEdit.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activityDetail: '点我编辑活动介绍',
    typeArray: [{
      id: 0,
      type: "高尔夫"
    }, {
      id: 1,
      type: "保龄球"
    }, {
      id: 2,
      type: "滑翔伞"
    }, {
      id: 3,
      type: "艺术展"
    }, {
      id: 4,
      type: "音乐会"
    }, {
      id: 5,
      type: "茶艺"
    }, {
      id: 6,
      type: "摄影"
    }, {
      id: 7,
      type: "读书"
    }, {
      id: 8,
      type: "书画"
    }, {
      id: 9,
      type: "骑术"
    }, {
      id: 10,
      type: "射箭"
    }, {
      id: 11,
      type: "酒会"
    },],
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
  toActivityEditor: function () {
    wx.navigateTo({
      url: '../activityEditor/activityEditor',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  pushTitle: function (e) {
    let idx = e.currentTarget.dataset.idx;
    let array = this.data.activity_describe;
    array[idx].title = e.detail.value;
    this.data.activity_describe = array

  },
  pushContent: function (e) {
    let idx = e.currentTarget.dataset.idx;
    let array = this.data.activity_describe;
    array[idx].content = e.detail.value;
    this.data.activity_describe = array
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
  population: function (e) {
    this.setData({
      activity_population: e.detail.value
    })
  },
  adress: function (e) {
    this.setData({
      activity_adress: e.detail.value
    })
  },

  title: function (e) {
    this.setData({
      activity_title: e.detail.value
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
  bindTypeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    this.setData({

      activity_type: this.data.typeArray[e.detail.value].type
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      activity_start_date: e.detail.value
    })
  },
  bindStartDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);

    this.setData({
      activity_date: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);

    this.setData({
      activity_date_deadline: e.detail.value
    })
  },
  bindStartTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);

    this.setData({
      activity_time: e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      activity_time_deadline: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('onload')
    // var that = this;
    // wx.getLocation({
    //   type: 'wgs84',
    //   success(res) {
    //     that.setData({
    //       activity_latitude: res.latitude,
    //       activity_longitude: res.longitude
    //     })
    //   }
    // });
    // wx.getStorage({
    //   key: 'publish',
    //   success: function (res) {
    //     console.log(res)
    //     app.globalData.activityEdit = res.data.activity_content
    //     console.log(app.globalData.activityEdit + ' ' + res.data.activity_content)
    //     that.setData({
    //       activity_content: res.data.activity_content,
    //       activity_title: res.data.activity_title,
    //       activity_type: res.data.activity_type,
    //       activity_population: res.data.activity_population,
    //       activity_start_date: res.data.activity_start_date,
    //       activity_date: res.data.activity_date,
    //       activity_time: res.data.activity_time,
    //       activity_date_deadline: res.data.activity_date_deadline,
    //       activity_time_deadline: res.data.activity_time_deadline,
    //       activity_adress: res.data.activity_adress,
    //       activity_latitude: res.data.activity_latitude,
    //       activity_longitude: res.data.activity_longitude,
    //       activity_describe: res.data.activity_describe,
    //       activity_leader: res.data.activity_leader,
    //       user_avatarUrl: res.data.user_avatarUrl,
    //       activity_present_population: res.data.activity_present_population,
    //     })
    //   },
    // });

    // wx.login({
    //   success(res) {
    //     wx.request({
    //       url: 'https://www.monodark.cn/test2-maven/getUserInfoByCode',
    //       data: {
    //         code: res.code
    //       },
    //       header: {
    //         'content-type': 'application/x-www-form-urlencoded'
    //       },
    //       method: 'post',
    //       success(res) {
    //         that.setData({
    //           user_nickName: res.data.user_nickName,
    //           user_avatarUrl: res.data.user_avatarUrl,
    //           user_OpenID: res.data.user_OpenID,
    //           user_verified: res.data.user_verified,
    //           activity_verified: res.data.user_verified,
    //           activity_leader: res.data.user_nickName,
    //           activity_leader_icon: res.data.user_avatarUrl
    //         });
    //       }
    //     })
    //   }
    // })

    // if (options.official == "true") {
    //   that.setData({
    //     official: false
    //   })
    // } else {
    //   that.setData({
    //     official: true
    //   })
    // }
    // console.log(that.data.official)
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
    // console.log('onshow')
    // var that = this
    // console.log('debug' + app.globalData.activityEdit)
    // this.data.activity_content = app.globalData.activityEdit
    // if (app.globalData.activityEdit != null) {
    //   that.setData({
    //     activityDetail: '活动介绍编辑完成'
    //   })
    // }
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
    // var that = this;
    // wx.setStorage({
    //   key: 'publish',
    //   data: {

    //     activity_title: that.data.activity_title,
    //     activity_type: that.data.activity_type,
    //     activity_population: that.data.activity_population,
    //     activity_start_date: that.data.activity_start_date,
    //     activity_date: that.data.activity_date,
    //     activity_time: that.data.activity_time,
    //     activity_date_deadline: that.data.activity_date_deadline,
    //     activity_time_deadline: that.data.activity_time_deadline,
    //     activity_adress: that.data.activity_adress,
    //     activity_latitude: that.data.activity_latitude,
    //     activity_longitude: that.data.activity_longitude,
    //     activity_content: app.globalData.activityEdit,

    //     activity_describe: that.data.activity_describe,

    //     activity_leader: that.data.activity_leader,
    //     user_avatarUrl: that.data.user_avatarUrl,
    //     activity_verified: that.data.user_verified,
    //     activity_present_population: that.data.activity_present_population,
    //   }
    // });
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
  chooselocate: function () {
    console.log("chooselocate")
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          activity_adress: res.name,
          activity_latitude: res.latitude,
          activity_longitude: res.longitude
        })
      },
    })
  },
  textareafocus: function () {
    this.setData({
      textareaHeight: '40vw'
    })
  },
  textareablur: function () {
    this.setData({
      textareaHeight: '15vw'
    })
  },
  publish: function () {
    wx.showToast({
      title: '程序员小哥哥正在加班开放该功能，敬请期待哦~',
      icon: 'none',
      duration: 1000,
      mask: true,
     
    })
  },
  
  topreviewActivity: function (event) {
    wx.showToast({
      title: '程序员小哥哥正在加班开放该功能，敬请期待哦~',
      icon: 'none',
      duration: 1000,
      mask: true,

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
    let length = 5 - (that.data.tempPhotoPath.length);
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      count: length,
      success: function (res) {
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
  checkchange: function () {
    this.data.agree = !this.data.agree;
  },
  touserAgreement: function () {
    wx.navigateTo({
      url: '../userAgreement/userAgreement',
    })
  },
  login: function (e) {
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