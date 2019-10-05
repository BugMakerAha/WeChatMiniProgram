// pages/activityApply/activityApply.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_id: 0,
    activity_img: null,
    activity_title: null,
    apply_state: null,
    apply_user_type: null,
    sponsor_user_OpenID: null,
    sponsor_user_avatarUrl: null,
    user_OpenID: null,
    user_avatarUrl: null,
    apply_user_message: '',
    isShare: false,
    user_gender: null,
    activity_verified: null,
    activity_detail: null,
    needPay: false,
    pageReady: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log(options)
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
        console.log(res)
        res.data.activity_describe = JSON.parse(res.data.activity_describe)
        that.setData({
          activity_detail: res.data
        })
        if (res.data.activity_payment) {
          if (res.data.activity_payment != 0) {
            that.setData({

              needPay: true,
              pageReady: true
            })
          }
        } else {
          // for (var i = 0; i < res.data.activity_describe.length; i++) {
          //   if (res.data.activity_describe[i].title == "活动费用" && res.data.activity_describe[i].content != "" && res.data.activity_describe[i].status) {
          //     res.data.activity_payment = res.data.activity_describe[i].content
          //     that.setData({
          //       activity_detail: res.data,
          //       needPay: true,
          //       pageReady: true

          //     })
          //   }
          // }
        }
        that.data.pageReady = true

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
  sendapply: function() {
    if (!this.data.pageReady) {
      return
    }
    var that = this;
    if (that.data.apply_user_message == '') {
      that.data.apply_user_message = '这个人懒得很，什么也没说。'
    }
    if (that.data.needPay) {
      wx.login({
        success: function(res) {
          var code = res.code
          wx.request({
            url: 'https://www.monodark.cn/test2-maven/weiXinPayJoinActivity',
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // 当method 为POST 时 设置以下 的header 
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              code: code,
              activity_id: that.data.activity_detail.activity_id
            },
            success: function(res) {
              console.log(res);
              // console.log(res.data.return_code);
              // console.log(res.data.timeStamp);
              // console.log(res.data.nonceStr);
              // console.log(res.data.package);
              // console.log(res.data.signType);
              // console.log(res.data.paySign);
              if (res.data.return_code == "SUCCESS") {
                wx.requestPayment({
                  'timeStamp': res.data.timeStamp,
                  'nonceStr': res.data.nonceStr,
                  'package': res.data.package,
                  'signType': 'MD5',
                  'paySign': res.data.paySign,
                  'success': function(res) {
                    console.log("success")
                    that.insertActivityApply()
                  },
                  'fail': function(res) {
                    console.log("fail")
                  },
                  'complete': function(res) {
                    console.log("complete")
                  }
                })
                console.log("return_code" + "SUCCESS");
              }
              if (res.data.return_code == "FAIL" || res.data.return_code == null) {
                //订单生成失败的操作，弄一个订单生成失败的界面
              }
            }
          })
        }
      })
    } else {
      that.insertActivityApply()
    }

  },
  insertActivityApply: function() {
    var that = this
    wx.showLoading({
      title: '正在提交申请',
    })
    // console.log(that.data.activity_detail.activity_id)
    // console.log(app.globalData.userInfo.user_OpenID)
    // console.log(that.data.activity_detail.user_OpenID)
    // console.log(that.data.activity_detail.activity_img)
    // console.log(that.data.activity_detail.activity_title)
    // console.log(that.data.apply_user_message)
    // console.log(that.data.activity_detail.activity_verified)
    wx.request({
      url: 'https://www.monodark.cn/test2-maven/insertActivityApplyReform',
      method: 'POST',
      data: {
        activity_id: that.data.activity_detail.activity_id,
        user_OpenID: app.globalData.userInfo.user_OpenID,
        apply_state: '正在请求',
        apply_user_type: '申请人',
        sponsor_user_OpenID: that.data.activity_detail.user_OpenID,
        activity_img: that.data.activity_detail.activity_img[0],
        activity_title: that.data.activity_detail.activity_title,
        apply_user_message: that.data.apply_user_message,
        activity_verified: that.data.activity_detail.activity_verified
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res)
        wx.redirectTo({
          url: '../myMessage/myMessage'
        })
        wx.showToast({
          title: '申请已提交',
          icon: 'success'
        });
      }
    })
  },
  applyinput: function(e) {
    this.setData({
      apply_user_message: e.detail.value
    })
  }
})