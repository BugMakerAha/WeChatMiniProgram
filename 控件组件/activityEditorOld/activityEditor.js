const app = getApp();
Page({
  data: {
    formats: {},
    bottom: 0,
    readOnly: false,
    placeholder: '开始编辑活动介绍...',
    _focus: false,
    editorCtx: null,
    textLength: 0,
    outOfLength: false,
    intoView: "toolbar",
    showBackModalCallback: null
  },
  editorfocus: function(e) {
    console.log(e)
  },
  editorInput: function(e) {
    var length = e.detail.html.length
    // var length2 = JSON.stringify(e.detail.delta).length
    // var length3 = e.detail.text.length
    // console.log("html:"+length)
    // console.log(e.detail.html)
    // console.log("delta:"+length2)
    // console.log(e.detail.delta)
    // console.log("text:" + length3)
    // console.log(e.detail.text)
    if (length <= 5000) {
      this.setData({
        textLength: length,
        outOfLength: false
      })
    } else {
      this.setData({
        textLength: length,
        outOfLength: true
      })
    }
  },
  submit: function() {
    this.data.editorCtx.getContents({
      success: function(res) {
        var length = res.html.length
        console.log(length)
        console.log(res)
        if (length <= 5000) {
          app.globalData.activityEdit = res.html;
          if (getCurrentPages().length <= 1) {
            wx.reLaunch({
              url: '../index/index',
            })
          } else {
            wx.navigateBack({
              delta: 1
            });
          }
        } else {
          wx.showToast({
            title: '长度超出限制！',
            icon: 'none',
            image: '',
            duration: 1000,

          })
        }

      }
    })


  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },

  onLoad(option) {
    var that = this
    that.setData({
      showBackModalCallback: {
        title: "需要保存编辑内容吗？",
        content: "",
        confirmText: "保存",
        cancelText: "否",
        confirm: function () {
          console.log("success")
          that.submit()
        },
        cancel: function () {
          console.log("fail")
          if (getCurrentPages().length <= 1) {
            wx.reLaunch({
              url: '../index/index',
            })
          } else {
            wx.navigateBack({
              delta: 1
            });
          }
        }

      }
    })

  },

  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function(res) {

      that.data.editorCtx = res.context
      that.data.editorCtx.setContents({
        html: app.globalData.activityEdit
      })
    }).exec()

  },

  undo() {
    this.data.editorCtx.undo()
  },
  redo() {
    this.data.editorCtx.redo()
  },
  format(e) {
    let {
      name,
      value
    } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.data.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({
      formats
    })
  },
  insertDivider() {
    this.data.editorCtx.insertDivider({
      success: function() {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    var that = this
    wx.showModal({
      title: '此操作不可撤销',
      content: '确定清空编辑内容吗？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '',
      confirmText: '确认',
      confirmColor: '',
      success: function(res) {
        that.data.editorCtx.clear({
          success: function(res) {
            console.log("clear success")
          }
        })

      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },
  removeFormat() {
    this.data.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.data.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      success: function(res) {
        console.log(res)
        wx.showLoading({
          title: '请稍后',
          mask: true,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
        wx.uploadFile({
          url: 'https://www.monodark.cn/test2-maven/upload/uploadFile4',
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          method: 'POST',
          header: {
            "Content-Type": "multipart/form-data"
          },
          success: function(res) {
            console.log(res)
            wx.hideLoading();
            that.data.editorCtx.insertImage({
              src: res.data,
              data: {
                id: 'abcd',
                role: 'god'
              },
              success: function() {
                console.log('insert image success')
              },
              fail: function() {
                console.log('insert image fail')
              }
            })
            that.data.editorCtx.insertText({
              text: " "
            })
          },
          fail: function(res) {
            wx.showToast({
              title: '错误',
              icon: 'none',
              image: '',
              duration: 500,

            })
            console.log('fail:' + res)
          },
          complete: function(res) {
            console.log('complete:' + res)
          },
        })

      }
    })
  }
})