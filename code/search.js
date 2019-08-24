var console = require('console')
var config = require('config')
var http = require('http')
var helperLogics = require('helperLogics.js')
var uber = require('api/apiUber.js')
var juso = require('api/apiJuso.js')
var kakao = require('api/apiKakao.js')

module.exports.function = function search (input_start_point, input_end_point){

  let logic = false;
  let startPointEng = startPointKor = null;
  let endPointEng = endPointKor = null;
  let endPointLatLong = startPointLatLong = {};
  let resultStartPoint = resultEndPoint = {};
  let price = null;
  
  if(input_start_point && input_start_point.point && input_end_point !== undefined){
    startPointLatLong.point = {
      lat: input_start_point.point.latitude,
      long: input_start_point.point.longitude
    }
    startPointKor = kakao.changeLatLongToAddr(startPointLatLong.point);
     
    input_end_point = (input_end_point == '집')? 'home' : input_end_point;
    input_end_point = (input_end_point == '회사')? 'work' : input_end_point;
    
    if(input_end_point == 'home' || input_end_point == 'work'){
      endPointEng = uber.getPlace(input_end_point)
      endPointEng = endPointEng.address;
      endPointKor = juso.getAddr(endPointEng, 'eng-kor');
    }
    else{
      endPointKor = juso.getAddr(input_end_point, 'kor-kor')
      endPointEng = juso.getAddr(endPointEng, 'eng-kor');
    }
    
    let getEndLatLong = kakao.getLatLong(endPointKor)
     endPointLatLong.point = {
      latitude: getEndLatLong.lat,
      longitude: getEndLatLong.long
     }
  }
  products = uber.getProduct(startPointLatLong.point);

  return {
    input_start_point: startPointKor,
    input_end_point: endPointKor,
    point_start: startPointLatLong,
    point_end: endPointLatLong,
    products: products
  }
}