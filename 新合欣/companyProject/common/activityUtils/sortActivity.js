module.exports = {
  sortByDistance:sortByDistance
}

function sortByDistance(obj){
  var activitys = obj.data
  activitys.sort(function(a,b){
    return a.distance-b.distance
  })
  console.log(activitys)
}
