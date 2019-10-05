// pages/allianceArea/allianceArea.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    swipeIndex: 0,
    itemCurrent1: 0,
    itemIndex1: 0,
    itemCurrent2: 0,
    itemIndex2: 0,
    itemCurrent3: 0,
    itemIndex3: 0,
    flag1: false,
    flag2: false,
    flag3: true,



    allmoney: 700000,
    payChecked: 0,
    enable: 1,
    showModal: false,
    shows: false,
    touchStart: [],
    touchTemp: [],
    topshow: true,
    curAnimation: null,
    user_openID: null,
    upanimation: null,
    downanimation: null,
    btnItemAnimation: [],
    buttonOpened: true,
    showButtonItem: false,
    hideAnimation: wx.createAnimation({
      duration: 400,
      timingFunction: "linear",
      delay: 0,
      transformOrigin: '"50% 50% 0"',
    }).translateY(-100).opacity(0).step().export(),
    showAnimation: wx.createAnimation({
      duration: 400,
      timingFunction: "linear",
      delay: 0,
      transformOrigin: '"50% 50% 0"',
    }).translateY(0).opacity(1).step().export(),
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
    }).opacity(0.4).rotate(180).step().export(),
    openBtnItem: [],
    closeBtnItem: [],
    programingArray: [{
      img: 'http://img5.imgtn.bdimg.com/it/u=1036550264,787140207&fm=26&gp=0.jpg',
      title: '书法培训机构规模扩张需要20万,保证赚钱求支持',
      support: 10,
      all: 20
    }, {
      img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1550230648,2875109181&fm=26&gp=0.jpg',
      title: '户外摄影需要购买器材，回报率高，希望大家支持',
      support: 12,
      all: 20
    }],
    passedProgram: [{
      img: 'http://img2.imgtn.bdimg.com/it/u=4191160947,2466836043&fm=26&gp=0.jpg',
      title: "一个非常受欢迎酒吧需要扩张",
      supportPercent: 75,
      peopleNum: 30,
      state: "正在拨款中"
    }, {
      img: 'http://img2.imgtn.bdimg.com/it/u=3207415507,4046372375&fm=26&gp=0.jpg',
      title: "保龄球馆店面翻新",
      supportPercent: 60,
      peopleNum: 60,
      state: "项目未通过"

    }],
    resourceArray: [{
      img: "http://img0.imgtn.bdimg.com/it/u=3961379971,1489832055&fm=26&gp=0.jpg",
      title: "平安象湖一套房可免费使用",
      resourceType: "场地资源",

    }, {
      img: "http://img4.imgtn.bdimg.com/it/u=2948020537,2222853691&fm=11&gp=0.jpg",
      title: "高端写字楼空置楼层",
      resourceType: "场地资源",

    }],
    goneResource: [{
      img: "http://img2.imgtn.bdimg.com/it/u=3479569668,1974575388&fm=26&gp=0.jpg",
      title: "私人场地空置供免费使用",
      resourceType: "场地资源"

    }, {
      img: "http://img2.imgtn.bdimg.com/it/u=2298026807,1417659153&fm=26&gp=0.jpg",
      title: "高质量客户群体",
      resourceType: "渠道资源"

    }, {
      img: "http://img1.imgtn.bdimg.com/it/u=283716410,1634900993&fm=26&gp=0.jpg",
      title: "大型活动举办现场",
      resourceType: "场地资源"

    }],
    brandArray: [{
      logo: "http://img.zcool.cn/community/01e1e8590bf4d5a801214550b1ad5b.gif",
      name: "ENEGY健身俱乐部"
    }, {
      logo: "http://img0.imgtn.bdimg.com/it/u=731462772,3638695678&fm=26&gp=0.jpg",
      name: "TWAROE"
    }, {
      logo: "http://img4.imgtn.bdimg.com/it/u=2863459358,2686205898&fm=26&gp=0.jpg",
      name: "爱马人"
    }, {
      logo: "http://img0.imgtn.bdimg.com/it/u=3626993399,3135234047&fm=26&gp=0.jpg",
      name: "BLACKTIPS"
    }, {
      logo: "http://img1.imgtn.bdimg.com/it/u=3915355956,2106646091&fm=26&gp=0.jpg",
      name: "F A W"
    }, {
      logo: "http://img0.imgtn.bdimg.com/it/u=2793377792,2724799358&fm=26&gp=0.jpg",
      name: "easy swim"
    }, {
      logo: "http://img2.imgtn.bdimg.com/it/u=1700860902,1780772032&fm=214&gp=0.jpg",
      name: "豚音游泳俱乐部"
    }],
    meetArray: [{
      meet_verified: 2,
      meet_img: ["http://img1.imgtn.bdimg.com/it/u=2352458788,4120593277&fm=26&gp=0.jpg"],
      meet_title: "第三届私董会",
      meet_present_population: 20,
      meet_population: 50,
    }, {
      meet_verified: 2,
      meet_img: ["http://img3.imgtn.bdimg.com/it/u=2812595085,1096398504&fm=26&gp=0.jpg"],
      meet_title: "第二届私董会",
      meet_present_population: 20,
      meet_population: 50,
    }, {
      meet_verified: 2,
        meet_img: ["http://123.56.24.144:80/group1/M00/00/14/rBEVT11P0bWAYQSKAAGl6Cji_Z0226.png"],
      meet_title: "第一届私董会",
      meet_present_population: 20,
      meet_population: 50,
    }],

  },
  toPublishMeet: function() {
    wx.navigateTo({
      url: '../publishMeet/publishMeet',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  toPublishLogo: function() {
    wx.navigateTo({
      url: '../publishLogo/publishLogo',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  toPublishMoney: function() {
    wx.navigateTo({
      url: '../publishMoney/publishMoney',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  toPublishResource: function() {
    wx.navigateTo({
      url: '../publishResource/publishResource',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  toMeetInfo: function() {
    wx.navigateTo({
      url: '../meetInfo/meetInfo',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  toLogoInfo: function() {
    wx.navigateTo({
      url: '../logoInfo/logoInfo',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  toResourseInfo: function() {
    wx.navigateTo({
      url: '../resourceInfo/resourceInfo',
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
    for (var i = 0; i < 4; i++) {
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
  touchstart: function(e) {
    // console.log(e.touches[0].clientY)

    this.data.touchStart = [e.touches[0].clientX, e.touches[0].clientY]
    this.data.touchTemp = [e.touches[0].clientX, e.touches[0].clientY]
    console.log(this.data.touchStart)
  },
  touchmove: function(e) {
    // console.log(e.touches[0].clientY)
    // console.log(e.touches[0].pageY)
    var that = this
    var moved = [e.touches[0].clientX - this.data.touchTemp[0], e.touches[0].clientY - this.data.touchTemp[1]]
    this.data.touchTemp = [e.touches[0].clientX, e.touches[0].clientY]
    // console.log(moved)
    if (!this.data.topshow && moved[1] > 0) {
      //下滑

      this.setData({
        curAnimation: that.data.showAnimation,
        topshow: true
      })
    }
    if (this.data.topshow && moved[1] < 0 && e.touches[0].clientY - that.data.touchStart[1] < -130) {
      //上滑
      this.setData({
        curAnimation: that.data.hideAnimation,
        topshow: false
      })
    }
  },
  touchend: function(e) {
    console.log(e)
  },
  /**
   * 提交表单
   * 
   */
  submit: function(e) {
    var that = this
    console.log(e)
    if (e.detail.value.radio == 'cdk') {
      if (e.detail.value.cdk != '') {
        wx.request({
          url: 'https://www.monodark.cn/test2-maven/useActivationCode',
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            activation_code: e.detail.value.cdk,
            user_id: 1

          },
          success(res) {
            if (res.data == 0) {
              wx.showToast({
                title: '激活码错误',
                icon: 'none',

              })
            }
            if (res.data == 1) {
              wx.showToast({
                title: '激活码使用成功',
                icon: 'none',

              })
            }
            console.log(res)
          }
        })
      }
    }
  },
  closeModal: function() {
    this.setData({

      showModal: false
    })
  },
  openModal: function() {
    this.setData({

      showModal: true
    })
  },
  pay_tap: function(e) {
    if (this.data.enable == 2) {
      return
    }
    let idx = e.currentTarget.dataset.idx;
    console.log(e)
    this.setData({
      payChecked: idx
    })
  },
  radioChange: function(event) {
    if (event.detail.value == 'pay') {
      this.setData({
        enable: 1
      })
    } else {
      this.setData({
        payChecked: 0,
        enable: 2
      })
    }
  },
  toProgramInfo: function() {
    wx.navigateTo({
      url: '../programInfo/programInfo',
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

  },
  swiperItemChange1: function(e) {
    var that = this;
    that.setData({
      itemIndex1: e.detail.current,
      curAnimation: that.data.showAnimation,
      topshow: true

    });
  },
  swiperItemChange2: function(e) {
    var that = this;
    that.setData({
      itemIndex2: e.detail.current
    });
  },
  swiperItemChange3: function(e) {
    var that = this;
    that.setData({
      itemIndex3: e.detail.current
    });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function(e) {

    var that = this;

    if (this.data.swipeIndex === e.currentTarget.dataset.current) {
      return false;
    } else {

      that.setData({
        currentTab: e.currentTarget.dataset.current
      })
      if (this.data.currentTab == 0) {
        setTimeout(function() {
          that.setData({
            shows: !that.data.shows
          })
        }, 250)
      }
    }

  },
  itemSwich1: function(e) {
    var that = this;
    if (this.data.itemIndex1 === e.currentTarget.dataset.current1) {
      return false;
    } else {
      that.setData({
        itemIndex1: e.currentTarget.dataset.current1,
        itemCurrent1: e.currentTarget.dataset.current1
      })
    }
  },
  itemSwich2: function(e) {
    var that = this;
    console.log(e)
    if (this.data.itemIndex2 === e.currentTarget.dataset.current2) {
      return false;
    } else {
      that.setData({
        itemIndex2: e.currentTarget.dataset.current2,
        itemCurrent2: e.currentTarget.dataset.current2
      })
    }
  },
  itemSwich3: function(e) {
    var that = this;
    if (this.data.itemIndex3 === e.currentTarget.dataset.current3) {
      return false;
    } else {
      that.setData({
        itemIndex3: e.currentTarget.dataset.current3,
        itemCurrent3: e.currentTarget.dataset.current3
      })
    }
  },

  /**
   * 滑动item绑定事件
   */
  swiperTrans: function(e) {
    var that = this
    var dx = e.detail.dx
    if (this.data.flag3 && (this.data.flag2) && (dx >= 50) && (dx < 100)) {
      console.log('debug')
      that.data.flag3 = false
      this.setData({
        currentTab: that.data.swipeIndex + 1,
      })
    }
    if (this.data.flag3 && (this.data.flag1) && (dx <= -50) && (dx > -100)) {
      that.data.flag3 = false
      this.setData({
        currentTab: that.data.swipeIndex - 1,
      })
    }

  },

  itemTouchLeftMove: function(e) {
    this.data.flag1 = true;
  },
  itemTouchLeftEnd: function(e) {
    this.data.flag1 = false;
    this.data.flag3 = true;
  },
  itemTouchRightMove: function(e) {
    this.data.flag2 = true;
  },
  itemTouchRightEnd: function(e) {
    this.data.flag2 = false;
    this.data.flag3 = true;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getBtnAnimation()
    var that = this
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        that.user_openID = res.data.user_OpenID
      },
      fail: function(res) {},
      complete: function(res) {},
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

  }
})