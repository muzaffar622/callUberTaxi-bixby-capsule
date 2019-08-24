var console = require('console')
var config = require('config')
var http = require('http')
var helperLogics = require('helperLogics')

 /* GET latitude longitude from address using KAKAO API
 */
function getLatLong(addr){
  let request = response = null;
  let latLong = {};
  if(addr){
    let options = {
      format: 'json',
      query: {
        query: String(addr)
      },
      headers: {
        'Authorization': 'KakaoAK ' + config.get('kakao.key'),
        'Content-Type': 'application/json',
      },
    }
     try{
        request = http.getUrl(config.get('kakao.address.url'), options)
          if(request && 
            request.documents[0] &&
            request.documents[0].address &&
            request.documents[0].address.y && 
            request.documents[0].address.x){
            latLong.lat = request.documents[0].address.y
            latLong.long = request.documents[0].address.x
          }
          return response = latLong;
        } catch(err){
          console.log('ERROR getLatLong', err)
          return null;
      }
  }
}

/* change lat long to address
 * output data from geo.location  
 * input should be address = {latitude, longitude}
 */
function changeLatLongToAddr(latLong){
  let request = response = null;
  if(latLong &&
     latLong.lat &&
     latLong.long){
    try{
     let options = {
      format: 'json',
      query: {
        x: latLong.long,
        y: latLong.lat,
        input_coord: 'WGS84'
      },
      headers: {
        'Authorization': 'KakaoAK ' + config.get('kakao.key'),
        'Content-Type': 'application/json',
      },
     }
     request = http.getUrl(config.get('kakao.latLong.url'), options)
      if(request && 
         request.documents[0] &&
         request.documents[0].address &&
         request.documents[0].address.address_name){
          response = request.documents[0].address.address_name;
          return response
      }
    } catch(err){
      console.log('ERROR changeLatLongToAddr', err);
      return null;
    }
  }
}

module.exports = {
  getLatLong: getLatLong,
  changeLatLongToAddr: changeLatLongToAddr
}
