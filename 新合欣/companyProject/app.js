//app.js
const worker = wx.createWorker('workers/getDistance.js')
App({
  data: {
    statusBarHeight: null,
  },
  globalData: {
    banbenhao: "1.0.3.0829.43",
    screenWidth: null,
    screenHeight: null,
    statusBarHeight: null,
    menuButtonRect: [],
    menuTop: null,
    animationInfoData: [],
    activityEdit: null,
    userInfo: null,
    passedPersonal: false,
    hideAnimation: wx.createAnimation({
      duration: 400,
      timingFunction: "linear",
      delay: 0,
      transformOrigin: '"50% 50% 0"',
    }).opacity(0).step().export(),
    showAnimation: wx.createAnimation({
      duration: 400,
      timingFunction: "linear",
      delay: 0,
      transformOrigin: '"50% 50% 0"',
    }).opacity(1).step().export(),
  },
  onLaunch: function() {
    var that = this;
    
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)

    })

    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function() {
      // 新版本下载失败
    })


    // 展示本地存储能力
    var tep = wx.getMenuButtonBoundingClientRect();

    this.globalData.menuButtonRect = [tep.width, tep.height];
    this.globalData.menutop = tep.top;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getSystemInfo({
      success: res => {
        console.log(res)
        wx.setStorageSync('sysInfo', res);
        this.globalData.statusBarHeight = res.statusBarHeight;
        this.globalData.screenWidth = res.screenWidth;
        this.globalData.screenHeight = res.screenHeight;
        console.log(this.globalData.statusBarHeight)
      }
    });
    wx.getLocation({
      success: function(res) {
        //纬度，范围为 -90~90，负数表示南纬
        console.log(res.latitude)
        that.globalData.latitude = res.latitude
        //经度，范围为 -180~180，负数表示西经
        console.log(res.longitude)
        that.globalData.longitude = res.longitude
      },
    });
  },
  fadeInInfo: function(num) {
    console.log(num);
    var that = this
    var animationInfoData = [];
    for (var i = 0; i < num; i++) {
      var animation = wx.createAnimation({
        duration: 400,
        timingFunction: 'ease',
        delay: 0
      })
      animation.opacity(0).scale(0.5).step({
        duration: 100
      })
      animation.opacity(1).scale(1).step({
        delay: 0
      });
      animationInfoData[i] = animation.export();
    }
    that.globalData.animationInfoData = animationInfoData;
  },
  getDistance: function(e) {
    var that = this
    worker.postMessage({
      activitys: e.activitys,
      latitude: that.globalData.latitude,
      longitude: that.globalData.longitude
    })
    worker.onMessage(function(res) {
      e.success(res)
    })
  },







})