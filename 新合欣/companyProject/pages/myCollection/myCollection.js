// pages/myCollection/myCollection.js
const app = getApp()
Page({


  /**
   * 页面的初始数据
   */
  data: {
    searchWidth: 14,
    searchFocus: false,
    user_OpenID: null,
    activity_info: [],
    showModal: false,
    deleteIndex: null,
    activity_id: null,
    animationInfoData: [],
    distance: []

  },
  // getDistance: function() {
  //   var that = this
  //   app.getDistance({
  //     activitys: that.data.activity_info,
  //     success: function(res) {
  //       console.log(res)
  //       //that.data.distance = res.distance
  //       that.setData({
  //         distance: res.distance
  //       })
  //     }
  //   })
  // },
  showModals: function(e) {
    wx.vibrateShort({
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    var that = this;
    let idx = e.currentTarget.dataset.index;
    console.log(e);
    this.setData({
      showModal: true,
      deleteIndex: idx,
      activity_id: e.currentTarget.dataset.activityid
    })
  },
  /**
   * 删除收藏
   */
  deleteActivity: function() {
    var arrays = this.data.activity_info;
    var that = this;
    wx.showLoading({
      title: '删除中',
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
        arrays.splice(that.data.deleteIndex, 1);
        that.setData({
          activity_info: arrays,
          showModal: false
        })
        wx.showToast({
          title: '删除成功',
          icon: "success"
        })
      },
      fail(res) {
        wx.showToast({
          title: '删除失败',
          icon: "success"
        })
        wx.hideLoading()
      }
    })
  },
  /**
   * 删除所有收藏
   */
  deleteAllActivity: function() {
    this.setData({
      activity_info: null,
      showModal: false

    })
  },
  searchFocus: function() {
    this.setData({
      searchFocus: true
    })

  },
  //搜索框得到焦点
  hasfocus: function() {
    this.setData({
      searchWidth: 70
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
  /**
   * 关闭弹窗
   */
  closeDialog: function() {
    this.setData({
      showModal: false
    })
  },
  toActivityInfo: function(event) {

      console.log(event.currentTarget.dataset)
      if (event.currentTarget.dataset.activitystate != 3) {
        wx.navigateTo({
          url: '../activityInfo/activityInfo?' +
            'activity_id=' + event.currentTarget.dataset.activityid +
            '&activity_title=' +
            event.currentTarget.dataset.activitytitle +
            '&activity_population=' +
            event.currentTarget.dataset.activitypopulation +
            '&activity_present_population=' +
            event.currentTarget.dataset.activitypresentpopulation +
            '&activity_img=' +
            JSON.stringify(event.currentTarget.dataset.activityimg) +
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
            '&activity_location=' +
            event.currentTarget.dataset.activitylocation +
            '&activity_type=' +
            event.currentTarget.dataset.activitytype +
            '&activity_verified=' +
            event.currentTarget.dataset.activityverified +
            '&activity_latitude=' +
            event.currentTarget.dataset.activitylatitude +
            '&activity_longitude=' +
            event.currentTarget.dataset.activitylongitude +
            '&activity_describe=' +
            event.currentTarget.dataset.activitydescribe +
            '&activity_describe_1=' +
            event.currentTarget.dataset.activitydescribe1 +
            '&activity_contact=' +
            event.currentTarget.dataset.activitycontact +
            '&activity_payment=' +
            event.currentTarget.dataset.activitypayment +
            '&activity_leader_icon=' +
            event.currentTarget.dataset.activityleadericon +
            '&activity_leader=' +
            event.currentTarget.dataset.activityleader
        })
      } else {
        wx.showToast({
          title: '该活动已失效',
          icon: 'none'
        })
      }
    }

    ,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.data.user_OpenID = app.globalData.userInfo.user_OpenID
    wx.request({
      url: 'https://www.monodark.cn/test2-maven/selectActivityInfoByActivityFavActivityId',
      data: {
        user_OpenID: app.globalData.userInfo.user_OpenID
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        console.log(res.data)
        that.setData({
          activity_info: res.data
        })
        that.playAnimation();
        //that.getDistance()

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
  playAnimation: function() {
    var that = this;
    app.fadeInInfo(that.data.activity_info.length);
    var animationInfoData = [];
    animationInfoData = app.globalData.animationInfoData;
    that.setData({
      animationInfoData: animationInfoData
    })
    console.log(that.data.animationInfoData);
  },
  candidate: function() {
    wx.navigateTo({
      url: '../creativeCandidate/creativeCandidate',
    })
  }
})