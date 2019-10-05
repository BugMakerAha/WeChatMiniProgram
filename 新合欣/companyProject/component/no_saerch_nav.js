// component/no-saerch-nav.js
const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    pageName: {
      type: String,
      value: "无标题"
    },
    showback: {
      type: Boolean,
      value: false
    },
    showBackModal: {
      type: Boolean,
      value: false
    },
    pageNameSec: {
      type: String,
      value: ''
    },
    showBackModalCallback: null,

    stylefir: {
      type: String,
      value: ''
    },
    stylesec: {
      type: String,
      value: ''
    }
    // showHome: {
    //   type: Boolean,
    //   value: true
    // }
  },
  /**
   * 组件的初始数据
   */
  data: {
    navH: (app.globalData.menutop + app.globalData.menuButtonRect[1] + 3),
    menuButtonH: app.globalData.menuButtonRect[1],
    menutop: app.globalData.menutop
  },

  attached: function() {
    console.log(this.data.menuTop + "" + this.data.menuButtonH + "" + this.data.navH);
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //回退

    navBack: function() {
      var showBackModalCallback = this.data.showBackModalCallback
      if (showBackModalCallback != null) {
        wx.showModal({
          title: showBackModalCallback.title,
          content: showBackModalCallback.content,
          showCancel: true,
          cancelText: showBackModalCallback.cancelText,
          confirmText: showBackModalCallback.confirmText,
          success: function(res) {
            if (res.confirm) {
              showBackModalCallback.confirm()
            }else if(res.cancel){
              showBackModalCallback.cancel()
            }
          },
          fail: function(res) {
            
          },
          complete: function(res) {

          },
        })
      } else {
        if (getCurrentPages().length <= 1) {
          wx.reLaunch({
            url: '/pages/index/index',
          })
        } else {
          wx.navigateBack({
            delta: 1
          });
        }
      }


    },
    //回主页
    toIndex: function() {
      wx.navigateTo({
        url: '/pages/index/index'
      })
    },
  }
})