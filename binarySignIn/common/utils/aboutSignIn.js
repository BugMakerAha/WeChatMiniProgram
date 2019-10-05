module.exports = {
  getWifiInfo: getWifiInfo,
  getSignInInfoByWifi: getSignInInfoByWifi,
  signIn: signIn
}
/* 获取wifi信息SSID和BSSID */
function getWifiInfo(obj) {
  var pack = {}
  pack.data = {}
  wx.startWifi({
    success: function(res) {

      wx.getConnectedWifi({
        success: function(res) {
          pack.data = res.wifi
          obj.success(pack)
          obj.complete(pack)
        },
        fail: function(res) {
          pack.errMessage = res
          obj.fail(pack)
          obj.complete(pack)

        },

      })
    },
    fail: function(res) {
      pack.errMessage = "初始化wifi模块失败"
      pack.data = res
      obj.fail(pack)
      obj.complete(pack)
    }
  })
}

//根据wifi获取绑定的打卡信息
function getSignInInfoByWifi(obj) {
  var pack = {}
  pack.data = {
    signInName: "二进制工作室打卡",
    signInTime: "9:00-21:00",
    wifi: {
      SSID: "BinaryStudio",
      BSSID: "74:c3:30:f1:40:56"
    }
  }
  obj.success(pack)
}

/* 签到 
code:
100：签到成功
120:无指纹
404：找不到打卡信息
101：wifi与打卡不匹配
102:未连接wifi
105:指纹不匹配*/
function signIn(obj) {
  var currentSignIn = obj.currentSignIn
  var pack = {}
  pack.code = 0

  this.getWifiInfo({
    success(res) {
      //匹配信息
      console.log(currentSignIn)
      console.log(res)
      if (currentSignIn.wifi.SSID = res.data.SSID && currentSignIn.wifi.BSSID == res.data.BSSID) {

        wx.checkIsSupportSoterAuthentication({
          success(res) {
            console.log(res)
            if (res.supportMode.length == 0) {
              //不支持指纹
              pack.code = 120
              obj.success(pack)

            } else {
              wx.startSoterAuthentication({
                requestAuthModes: ['fingerPrint'],
                challenge: '123456',
                authContent: '请用指纹验证',
                success(res) {
                  //发送签到数据
                  pack.code = 100
                  obj.success(pack)
                },
                fail() {
                  pack.code = 105
                  pack.data = "指纹不匹配"
                  obj.fail(pack)

                },

              })
            }
            // res.supportMode = ['fingerPrint', 'facial'] 支持指纹识别和人脸识别
          }
        })
      } else {
        pack.code = 101
        pack.data = "wifi不匹配"
        obj.fail(pack)
      }


    },
    fail(res) {
      pack.data = "未连接wifi"
      pack.code = 102
      obj.fail(pack)
    },
    complete(res) {

    }
  })


}