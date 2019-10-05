// highPlayerPackage/pages/playerArea/playerArea.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openButton: wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 200,
      transformOrigin: '"50% 50% 0"'
    }).opacity(1).rotate(0).step().export(),
    closeButton: wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0,
      transformOrigin: '"50% 50% 0"'
    }).opacity(0.4).rotate(0).step().export(),
    openBtnItem: [],
    closeBtnItem: [],
    upanimation: null,
    downanimation: null,
    btnItemAnimation: [],
    buttonOpened: true,
    hasNewMessage:false,

    swipeIndex: 0,
    currentTab: 0,
    playerActivityArray: [],
    missionArray: [{
      img: "http://img1.imgtn.bdimg.com/it/u=411808408,3593746467&fm=26&gp=0.jpg",
      title: "示例",
      time: "2020-01-01"
    }]
  },
  touchStart: function() {
    var that = this
    if (!that.data.buttonOpened) {
      that.setData({
        upanimation: that.data.openButton,
        downanimation: that.data.closeButton,
        btnItemAnimation: that.data.closeBtnItem
      })
      that.data.buttonOpened = true
    }
  },
  toActivityInfo: function(e) {
    wx.navigateTo({
      url: '../highActivityInfo/highActivityInfo?advanced_players_activity_id=' + e.currentTarget.dataset.activity_id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  toPublish: function() {
    wx.navigateTo({
      url: '../publishHighPlayerActivity/publishHighPlayerActivity',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  toMessage: function() {
    wx.navigateTo({
      url: '../messages/messages',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  getBtnAnimation: function() {
    var that = this
    var distance = 55;
    var anitime = 50;
    var delay = 50;
    var opentemp = [];
    var closetemp = [];
    for (var i = 0; i < 2; i++) {
      opentemp[i] = wx.createAnimation({
        duration: (i + 1) * anitime,
        timingFunction: "linear",
        delay: i * delay,
      }).opacity(1).translateX(-distance * (i + 1)).step().export()
      closetemp[i] = wx.createAnimation({
        duration: (i + 1) * anitime,
        timingFunction: "linear",
        delay: 0,
      }).opacity(0.5).translateX(-distance * (i + 1) - 10).step().translateX(0).step().export()
    }
    that.data.openBtnItem = opentemp;
    that.data.closeBtnItem = closetemp;
  },
  buttonCtrl: function() {
    var that = this
    if (this.data.buttonOpened) {
      that.setData({
        upanimation: that.data.closeButton,
        downanimation: that.data.openButton,
        btnItemAnimation: that.data.openBtnItem
      })
    } else {
      that.setData({
        upanimation: that.data.openButton,
        downanimation: that.data.closeButton,
        btnItemAnimation: that.data.closeBtnItem
      })
    }
    that.data.buttonOpened = !that.data.buttonOpened
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
  refresh:function(){
    var that = this
    wx.request({
      url: 'https://www.monodark.cn/test2-maven/selectAdvancedPlayersActivityInfoListInAdvancedPlayersPage',
      data: '',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {

        that.setData({
          playerActivityArray: res.data
        })

      },
      fail: function (res) { },
      complete: function (res) { },
    })
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    this.getBtnAnimation()
    
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
    console.log("onshow")
    that.refresh()
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

  }
})