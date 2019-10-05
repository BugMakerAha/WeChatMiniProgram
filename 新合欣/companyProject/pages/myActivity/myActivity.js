const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchWidth: 14,
    searchFocus: false,
    publishedActivity: [],
    currentTab: 0,
    swipeIndex: 0,
    joinedActivity: null
  },
  toUpload: function(event) {
    console.log(event)
    wx.navigateTo({
      url: '../uploadPhoto/uploadPhoto?activity_id=' +
        event.currentTarget.dataset.activityid +
        '&activity_leader=' +
        event.currentTarget.dataset.activityleader +
        '&activity_leader_icon=' +
        event.currentTarget.dataset.activityleadericon +
        '&activity_verified=' +
        event.currentTarget.dataset.activityverified,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  scan: function() {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success: function(res) {
        console.log("success")
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function(e) {

    var that = this;

    that.setData({
      swipeIndex: e.detail.current
    });
    this.onShow();
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function(e) {

    var that = this;

    if (this.data.swipeIndex === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        swipeIndex: e.target.dataset.current
      })
    }
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    if (options.removeSto == 'true') {
      wx.removeStorage({
        key: 'publish',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
    var that = this;
    that.data.user_OpenID = app.globalData.userInfo.user_OpenID


    wx.request({
      url: 'https://www.monodark.cn/test2-maven/selectActivityInfoByActivityDetailActivityId',
      data: {
        user_OpenID: that.data.user_OpenID
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        console.log(res.data)
        that.setData({
          publishedActivity: res.data
        })
      }
    });
    wx.request({
      url: 'https://www.monodark.cn/test2-maven/selectActivityInfoByUserOpenID',
      method: "POST",
      data: {
        user_OpenID: that.data.user_OpenID
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        that.setData({
          joinedActivity: res.data
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
  onShareAppMessage: function(event) {
    if (event.from === 'button') {
      console.log(event)
      // 来自页面内转发按钮
      return {
        title: "快来参加我发起的活动！",
        path: '/pages/activityInfo/activityInfo?' +
          'activity_id=' + event.target.dataset.activityid,
        imageUrl: event.target.dataset.activityimg[0]
      }
    }
  },
  toActivityInfo: function(event) {
    console.log(event.currentTarget.dataset)
    if (event.currentTarget.dataset.activitystate == 3) {
      wx.showToast({
        title: '该活动已失效',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '../activityInfo/activityInfo?' +
          'activity_id=' + event.currentTarget.dataset.activityid
      })
    }

  },
  cancelActivity: function(event) {
    console.log(event);
    var that = this;


    wx.showModal({
      title: '提示',
      content: '是否删除',
      success(res) {
        if (res.confirm) {
          var temp = that.data.publishedActivity
          temp[event.currentTarget.dataset.index].activity_state = 3;
          that.setData({
            publishedActivity: temp
          })
          console.log(event.currentTarget.dataset.activityid)
          wx.request({
            url: 'https://www.monodark.cn/test2-maven/cancelActivity',
            data: {
              activity_id: event.currentTarget.dataset.activityid
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {



            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  toactivityPhoto: function(event) {
    wx.navigateTo({
      url: '../activityPhoto/activityPhoto?activity_id=' +
        event.currentTarget.dataset.activityid +
        '&activity_leader=' +
        event.currentTarget.dataset.activityleader +
        '&activity_leader_icon=' +
        event.currentTarget.dataset.activityleadericon +
        "&activity_verified=" +
        event.currentTarget.dataset.activityverified

    })

  }
})