module.exports = {
  uploadPhoto: uploadPhoto
}
/**
 * filePaths:图片数组
 * success(res)
 * res:网络图片字符串数组
 */
function uploadPhoto(obj) {
  var netPaths = []
  for (var i = 0; i < obj.filePaths.length; i++) {

    wx.uploadFile({
      url: 'https://hd.huining888.com/test2-maven/upload/uploadFile4',
      filePath: obj.filePaths[i],
      name: 'file',
      formData: {
        'user': 'test'
      },
      method: 'POST',
      header: {
        "Content-Type": "multipart/form-data"
      },
      success(res) {
        netPaths = netPaths.concat(res.data)
        if (netPaths.length === obj.filePaths.length){
          obj.success(JSON.stringify(netPaths))
        }
      }
      
    })
  }
}