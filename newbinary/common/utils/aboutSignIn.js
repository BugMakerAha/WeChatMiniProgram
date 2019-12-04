module.exports = {
  getWifiInfo: getWifiInfo,
  getSignInInfoByWifi: getSignInInfoByWifi,
  signIn: signIn
}
const app = getApp()
const util = require("../../utils/util.js")
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
  wx.request({
    url: app.globalData.requestURL + "BinaryStudio/handleAttendance/selectAttendanceByBSSID",
    data: {
      attendance_BSSID: obj.attendance_BSSID
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function(res) {
      console.log(res)
      if (res.data.length == 0) {
        obj.fail()
      } else {

        pack.data = res.data
        obj.success(pack)
      }
    },
    fail: function(res) {},
    complete: function(res) {},
  })
}

/* 签到 
code:
100：签到成功

404：找不到打卡信息
101：wifi与打卡不匹配
102:未连接wifi
105:指纹不匹配*/
function signIn(obj) {
  var currentSignIn = obj.currentSignIn
  var pack = {}
  const signin = (signinInfo) => {
    wx.request({
      url: app.globalData.requestURL + "BinaryStudio/handleSign/addSign",
      data: {
        sign_time:signinInfo.time,
        attendance_id:signinInfo.attendance_id,
        user_OpenID:signinInfo.openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function(res) {
        console.log("debug")
        console.log(res)
        obj.success()

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
  pack.code = 0

  this.getWifiInfo({
    success(res) {
      //匹配信息
      console.log(currentSignIn)
      console.log(res)
      console.log(app.globalData.openID)
      if (currentSignIn.attendance_BSSID == res.data.BSSID) {

        var signinInfo = {
          time: util.formatTime(new Date()).toString(),
          openid:app.globalData.openID,
          attendance_id:currentSignIn.attendance_id
        }

        wx.checkIsSupportSoterAuthentication({
          success(res) {
            console.log(res)
            if (res.supportMode.length == 0) {
              //不支持指纹
              pack.code = 120
              signin(signinInfo)

            } else {
              wx.startSoterAuthentication({
                requestAuthModes: ['fingerPrint'],
                challenge: '123456',
                authContent: '请用指纹验证',
                success(res) {
                  signin(signinInfo)
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


  function signInNew(resolve,reject){
    var that = this
    function step1(resolve,reject){
      that.getWifiInfo({
        success(res){
          resolve()
        }
      })
    }
    function step2(resolve,reject){
      
    }
  }


}