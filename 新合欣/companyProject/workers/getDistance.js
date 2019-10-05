
var activitys=[]
var distances=[]
worker.onMessage(function (res){
  console.log("inworker")
  console.log(res)
  distances = []
  var user_latitude = res.latitude
  var user_longitude = res.longitude
  activitys = res.activitys
  
  for(var i = 0;i<activitys.length;i++){
    var distance = getDistance(user_latitude,user_longitude, activitys[i].activity_latitude,activitys[i].activity_longitude)
    activitys[i].distance = distance
    //distances = distances.concat(distance)
  }
  worker.postMessage({
    activitys: activitys
  })
})


function Rad(d) { //根据经纬度判断距离
  return d * Math.PI / 180.0;
}
function getDistance(lat1, lng1, lat2, lng2) {
  // lat1用户的纬度
  // lng1用户的经度
  // lat2商家的纬度
  // lng2商家的经度
  var radLat1 = Rad(lat1);
  //console.log(radLat1)
  var radLat2 = Rad(lat2);
  var a = radLat1 - radLat2;
  var b = Rad(lng1) - Rad(lng2);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  //console.log(s)
  s = s * 6378.137;
  s = Math.round(s * 10000) / 10000;
  s = s.toFixed(2) //保留两位小数
  //console.log('经纬度计算的距离:' + s)
  return s
}