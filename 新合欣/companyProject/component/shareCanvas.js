// component/shareCanvas.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    width: 300,
    height: 240,
    distance: 4,
    bottomdis: 6
  },

  /**
   * 组件的方法列表
   */
  methods: {
    drawImg: function(obj) {
      console.log("drawimg")
      var that = this;
      console.log(obj.img)
      wx.getImageInfo({
        src: obj.img,
        success: function(res) {
          console.log("success")
          clipImage(res.path, res.width, res.height, function success(res) {
            console.log("clip_success")
            obj.success(res)
          })


        },
        fail: function(res) {
          console.log("fail")
        },
        complete: function(res) {},
      })

      const clipImage = (src, imgW, imgH, success) => {
        console.log("clipstart")
        // ‘canvas’为前面创建的canvas标签的canvas-id属性值
        const ctx = wx.createCanvasContext("myCanvas", this)
        let canvasW = 0
        let canvasH = 0;
        // console.log("ttttt1")
        if (imgW / imgH > 5 / 3) {
          // 长宽比大于5:4
          canvasW = imgH * 5 / 3;
          canvasH = imgH
          //console.log("ttttt2")
          ctx.drawImage(src, (imgW - canvasW) / 2, 0, canvasW, canvasH, 0, 0, that.data.width, that.data.height * 3 / 4)
        } else {
          canvasH = imgW * 3 / 5;
          canvasW = imgW
          //console.log("ttttt2")
          ctx.drawImage(src, 0, (imgH - canvasH) / 2, canvasW, canvasH, 0, 0, that.data.width, that.data.height * 3 / 4)
        } // 将图片绘制到画布
        // draw()必须要用到，并且需要在绘制成功后导出图片
        ctx.setFillStyle("green")
        ctx.fillRect(0, that.data.height / 4 * 3 + that.data.distance, that.data.width, that.data.height / 4 - that.data.distance - that.data.bottomdis)
        ctx.draw(true)
        ctx.setFontSize(18)
        ctx.setFillStyle("white")
        ctx.setTextAlign("center")
        ctx.setTextBaseline("middle")
        ctx.fillText("点击参加活动", that.data.width / 2, that.data.height / 4 * 3 + that.data.distance + (that.data.height / 4 - that.data.distance - that.data.bottomdis) / 2)
        ctx.draw(true, function() {
          //该回调不执行，只能延时解决，等待官方修复
          //console.log("drawsuccess")


        })
        setTimeout(() => {
          wx.canvasToTempFilePath({
            canvasId: 'myCanvas',
            quality: 1,
            success: function(res) {
              //console.log("debug")
              success(res.tempFilePath)


            }
          }, that)

        }, 750)




      }



    }

  }
})