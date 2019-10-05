// pages/messageInfo/messageInfo.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user_avatarUrl:"",
    user_nickName:"一起旅行",
    isman:false,
    apply_user_message:"我也想加入你们我也想加入你们我也想加入你们我也想加入你们",
    activity_title:"一起去上网啊",
    user_gender:null,
    activity_id:null,
      activity_apply_id:null,
      ishandle:true,
      user_OpenID:null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      console.log(options)
      that.setData({
          user_avatarUrl:options.user_avatarUrl,
          user_nickName:options.user_nickName,
          apply_user_message:options.apply_user_message,
          activity_title:options.activity_title,
          user_gender:options.user_gender,
          activity_id:options.activity_id,
          activity_apply_id:options.activity_apply_id,
          user_OpenID:options.user_OpenID
      });
      console.log("options")
      console.log(that.data.activity_id)
      console.log(that.data.user_gender)
      if(that.data.user_gender)
      {
          that.setData({
              isman:true
          })
      }
      console.log(that.data.isman)
      wx.request({
          url: 'https://www.monodark.cn/test2-maven/selectActivityApplyState',
          data:{
              activity_id:that.data.activity_id,
              user_OpenID:that.data.user_OpenID
          },
          method:'POST',
          header: {
              'content-type': 'application/x-www-form-urlencoded'
          },
          success(res){
              console.log(res)
              if(res.data == '正在请求')
              {
                  that.setData({
                      ishandle:false
                  })
              }
          }

          
      })
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

  },
  apply:function(){
      var that = this;
      console.log(that.data.activity_id)
      wx.request({
          url: 'https://www.monodark.cn/test2-maven/changeActivityApplyReformApplyStateToSuccessfulApplication',
          method:'POST',
          data:{
              activity_apply_id:that.data.activity_apply_id
          },
          header: {
              'content-type': 'application/x-www-form-urlencoded'
          },
          success(res)
          {
              console.log("change")
              console.log(res)
              wx.showToast({
                  title: '已同意',
                  icon:'success'
              });
              wx.navigateBack({
                  delta:1
              })
          }
      })
  },
    reject: function () {
        var that = this;
        console.log(that.data.activity_id)
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
                });
                wx.navigateBack({
                    delta: 1
                })
            }
        })
    }
})