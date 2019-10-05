module.exports = {

}

//插入用户个人申请
 function insertPersonCertification(obj){
   wx.request({
     url: 'https://www.monodark.cn/test2-maven/insertUserApproveInfo',
     data: {
       user_id: obj.user_id
     },
     method: 'POST',
     header: {
       'content-type': 'application/x-www-form-urlencoded'
     },
     success: function(res) {},
     fail: function(res) {},
     complete: function(res) {},
   })
 }