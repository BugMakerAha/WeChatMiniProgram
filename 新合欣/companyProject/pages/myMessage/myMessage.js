// pages/myMessage/myMessage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    joinMessageArray: null,
    /* status:
        0:处理中
        1:同意
        2：拒绝
         */
    myApplyArray: null,
    currentTab: 0,
    swipeIndex: 0,
    user_OpenID: null,
    activity_apply_id: null,
    ishandle: null,
    systemMessageArray: null

  },
  /* 同意申请 */
  agree: function(e) {
    console.log(e)
  },
  /* 拒绝申请 */
  disagree: function(e) {

  },
  toMessageInfo: function(event) {
    console.log("event")
    console.log(event.currentTarget.dataset)
    wx.navigateTo({
      url: '../messageInfo/messageInfo?activity_title=' +
        event.currentTarget.dataset.activitytitle +
        '&user_OpenID=' + event.currentTarget.dataset.useropenid +
        '&activity_apply_id=' +
        event.currentTarget.dataset.activityapplyid +
        '&apply_user_message=' +
        event.currentTarget.dataset.applyusermessage +
        '&user_nickName=' +
        event.currentTarget.dataset.nickname +
        '&user_avatarUrl=' +
        event.currentTarget.dataset.useravatarurl +
        '&user_gender=' +
        event.currentTarget.dataset.usergender +
        '&activity_id=' +
        event.currentTarget.dataset.activityid,
      success: function(res) {},
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

    if (that.data.swipeIndex == e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        swipeIndex: e.currentTarget.dataset.current,
        currentTab: e.currentTarget.dataset.current
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    

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
    var that = this;
    that.data.user_OpenID = app.globalData.userInfo.user_OpenID

    wx.request({
      url: 'https://www.monodark.cn/test2-maven/selectActivityApplyReformApplier',
      method: 'POST',
      data: {
        user_OpenID: that.data.user_OpenID
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log("debug")
        console.log(res.data)
        that.setData({
          myApplyArray: res.data
        })
      }
    });

    wx.request({
      url: 'https://www.monodark.cn/test2-maven/selectActivityApplyReformSponsor',
      method: 'POST',
      data: {
        user_OpenID: that.data.user_OpenID
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        if (res.data == '该用户未收到任何请求') {
          that.setData({
            joinMessageArray: null
          })
        } else {

          that.setData({
            joinMessageArray: res.data
          })
        }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  tomessageInfo: function(event) {
    var that = this;
    wx.navigateTo({
      url: '../messageInfo/messageInfo?activity_id' +
        event.currentTarget.dataset.activityid +
        '&activity_title=' +
        event.currentTarget.dataset.activitytitle +
        '&user_avatarUrl=' +
        event.currentTarget.dataset.useravatarurl +
        '&user_nickName=' +
        event.currentTarget.dataset.nickname +
        '&user_gender=' +
        event.currentTarget.dataset.usergender +
        '&activity_apply_id=' +
        event.currentTarget.dataset.activityapplyid +
        '&apply_user_message=' +
        event.currentTarget.dataset.applyusermessage,
    })
  },
  apply: function(event) {
    var that = this;
    var index = event.currentTarget.dataset.index;
    let joinMessage = that.data.joinMessageArray;
    joinMessage[index].apply_state = "请求通过";
    that.setData({
      joinMessageArray: joinMessage
    })
    console.log(event.currentTarget.dataset.activityapplyid)
    wx.request({
      url: 'https://www.monodark.cn/test2-maven/changeActivityApplyReformApplyStateToSuccessfulApplication',
      method: 'POST',
      data: {
        activity_apply_id: event.currentTarget.dataset.activityapplyid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log("change")
        console.log(res);
        wx.showToast({
          title: '已同意',
          icon: 'success'
        })
      }

    })

  },
  reject: function(event) {
    var that = this;
    console.log(that.data.activity_id)
    var index = event.currentTarget.dataset.index;
    let joinMessage = that.data.joinMessageArray;
    joinMessage[index].apply_state = '请求未通过';
    that.setData({
      joinMessageArray: joinMessage
    })
    wx.request({
      url: 'https://www.monodark.cn/test2-maven/changeActivityApplyReformApplyStateToApplicationWasRejected',
      method: 'POST',
      data: {
        activity_apply_id: event.currentTarget.dataset.activityapplyid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log("change")
        console.log(res)
        wx.showToast({
          title: '已拒绝',
          icon: 'success'
        })
      }
    })

  }
})