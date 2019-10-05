// highPlayerPackage/pages/highPlayer/highPlayer.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    payChecked: 0,
    enable: 1,
  },


  /**
     * 提交表单
     * 
     */
  submit: function (e) {
    var that = this
    console.log(app.globalData.userInfo)
    if (e.detail.value.name == "" || e.detail.value.tel == "" || e.detail.value.qq == "" ){
      wx.showToast({
        title: '请输入完整信息',
        icon:"none"
      })
      return
    }
    //激活码支付
    if (e.detail.value.radio == 'cdk') {
      if (e.detail.value.cdk != '') {
        if (e.detail.value.cdk == 'wynhs'){
          wx.navigateTo({
            url: '../playerArea/playerArea',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
          return
        }
        wx.request({
          url: 'https://www.monodark.cn/test2-maven/useActivationCode',
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            activation_code: e.detail.value.cdk,
            user_id: app.globalData.userInfo.user_id,
            user_OpenID: app.globalData.userInfo.user_OpenID

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
              wx.redirectTo({
                url: '../playerArea/playerArea',

              })
            }
            console.log(res)
          }
        })
      } else {
        wx.showToast({
          title: '激活码不能为空',
          icon: 'none',
          duration: 500,
        })
      }
    } else {
      //使用微信支付
      if (that.data.payChecked == 0) {
        wx.showToast({
          title: '请选择支付年限',
          icon: 'none',
          duration: 500,

        })
      } else if (that.data.payChecked == 1) {
      
        that.payMoney(500)

      } else {
        
       
        that.payMoney(1000)
      }

    }

  },
  payMoney: function (money) {
    wx.login({
      success: function (res) {
        var code = res.code
        wx.request({
          url: 'https://www.monodark.cn/test2-maven/weiXinPayJoinUnion',
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // 当method 为POST 时 设置以下 的header 
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            code: code,
            payment_money: money
          },
          success: function (res) {

            // console.log(res);
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
                'success': function (res) {
                  console.log("success")
                  wx.redirectTo({
                    url: '../enterpriseCertification/enterpriseCertification',

                  })
                },
                'fail': function (res) {
                  console.log("fail")
                  wx.showToast({
                    title: '支付失败',
                    icon: 'none',
                    image: '',
                    duration: 1000,
                    mask: true,
                    success: function (res) { },
                    fail: function (res) { },
                    complete: function (res) { },
                  })
                },
                'complete': function (res) {
                  console.log("complete")
                }
              })
              console.log("return_code" + "SUCCESS");

            }
            if (res.data.return_code == "FAIL" || res.data.return_code == null) {
              //订单生成失败的操作，弄一个订单生成失败的界面
              wx.showToast({
                title: '网络错误',
                icon: 'none',
                image: '',
                duration: 1000,
                mask: true,
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })

            }
          }
        })
      }
    })

  },
  pay_tap: function (e) {
    if (this.data.enable == 2) {
      return
    }
    let idx = e.currentTarget.dataset.idx;
    console.log(e)
    this.setData({
      payChecked: idx
    })
  },
  radioChange: function (event) {
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
  closeModal: function () {
    this.setData({

      showModal: false
    })
  },
  openModal: function () {
    this.setData({

      showModal: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})