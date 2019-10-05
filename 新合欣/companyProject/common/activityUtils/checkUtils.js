module.exports = {
  checkPersonCertification: checkPersonCertification,
  checkAllianceState: checkAllianceState,
  checkActivityStateById: checkActivityStateById
}

const app = getApp()

//检查用户个人认证状态
//0：正在审核
//	1：审核成功
//	2：审核失败
//-1:未发送审核
function checkPersonCertification(obj) {
  console.log(obj)
  if(app.globalData.passedPersonal){
    obj.success(1)
    return
  }
  wx.request({
    url: 'https://www.monodark.cn/test2-maven/selectUserApproveInfoApproveStateByUserId',
    data: {
      user_id: obj.user_id
    },
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function(res) {
      console.log(res)
      var state = null
      if (res.data == 0) {
        state = -1
      }else if(res.data.approve_state == 1){
        app.globalData.passedPersonal = true
        state = 1
      } else {
        state = res.data.approve_state
      }
      obj.success(state);

    },
    fail: function(res) {},
    complete: function(res) {},
  })
}
/**
 * 检查企业联盟状态
 * 0:无联盟权限
 * 1:有联盟权限
 * 2:联盟权限到期
 */
function checkAllianceState(obj) {
  var state = 0
  wx.request({
    url: 'https://www.monodark.cn/test2-maven/selectCompanyInfoByUserId',
    data: {
      user_id: app.globalData.userInfo.user_id
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function(res) {
      console.log(res)
      console.log(app.globalData.userInfo.user_verified)
      if (res.data == 0) {
        state = 0
        if (app.globalData.userInfo.user_verified != 0){
          state = 1
        }
      } else if (res.data[0].company_name != '' || app.globalData.userInfo.user_verified != 0) {
        state = 1
      } else {
        state = 0
      }

      obj.success(state)
    },
    method: 'post',

    fail: function(res) {},
    complete: function(res) {},
  })
}

/**
 * activity_state:0未开始 1进行中 2正常结束 3被取消
 * activity_approve_state:0审核中 1审核通过 2审核未通过
 * 检查活动状态
 * -1:被取消
 * 0:审核通过且未开始
 * 1:审核通过且正在进行中
 * 2：审核通过且正常结束
 * 3：正在审核中
 * 4：审核未通过
 */
function checkActivityStateById(obj){
  var state = null
  var activityInfo = null

  wx.request({
    url: 'https://www.monodark.cn/test2-maven/selectActivityInfoByActivityId',
    data: {
      activity_id: obj.activity_id
    },
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success(res) {
      activityInfo = res.data
      if (activityInfo.activity_state == 0 && activityInfo.activity_approve_state==1){
        obj.success(0)
      }
      if (activityInfo.activity_state == 1 && activityInfo.activity_approve_state == 1) {
        obj.success(1)
      }
      if (activityInfo.activity_state == 2 && activityInfo.activity_approve_state == 1) {
        obj.success(2)
      }
      if (activityInfo.activity_approve_state == 2) {
        obj.success(4)
      }
      if (activityInfo.activity_approve_state == 0) {
        obj.success(3)
      }
      if (activityInfo.activity_state == 3) {
        obj.success(-1)
      }
    }
  })

}