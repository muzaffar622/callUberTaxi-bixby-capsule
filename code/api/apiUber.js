  var console = require('console')
  var config = require('config')
  var http = require('http')
  var helperLogics = require('helperLogics')

  function optionsFunc(){
    return {
        format: 'json', 
        headers: {
          'Accept-Language': 'ko_KR',
          'Content-Type': 'application/json'
        }
    }
  }

  /* GET 우버 API 통해 저장 된 home / work 창소를 가져오기
  * (현재는 UberAPI가 home 하고 집 주소만 제공합니다 )
  */
  function getPlace(addr){
    let response = null;
    console.log('addr',addr)
    if(addr){
      let options = optionsFunc();
      try{
        if(addr == 'home') {
          response = http.oauthGetUrl(config.get('uber.url')+ '/places/' + addr, options);
        }
        else if(addr == 'work') {
          response = http.oauthGetUrl(config.get('uber.url')+ '/places/' + addr, options);
        }
        return response;   
      } catch(err){
        return null;
        console.log('ERROR uberAPI',err)
      }
    }
  }

  /* PUT 우버 API 통해 저장 된 home / work 창소를 저장하기
  * (현재는 UberAPI가 home 하고 집 주소만 제공합니다)                                    "need fix the request"
  */
    function putPlace(addr, type){
    let url = response = null;
      if(addr){
        var options = {
          format: 'json', 
          headers: {
            'Accept-Language': 'ko-KR',
            'Content-Type': 'application/json'
          },
          body:{
            'address': String(addr)
          }
        }
        try{
          if(type == 'home') {
            response = http.oauthPutUrl(config.get('uber.url'+'/places/') + type, options);
          }
          else if(type == 'work') {
            response = http.oauthPutUrl(config.get('uber.url'+'places/') + type, options);
          }
          return response;
        } catch(err){
          return null;
          console.log('ERROR uberAPI',err)
        }
      }
    }


  /*
  * 출/도착의 미리 예산 금액을 보여 주는 API
  */
    function showPrice(addr1, add2){
        let options = {
          format: 'json', 
          headers: {
            'Accept-Language': 'ko_KR',
            'Content-Type': 'application/json'
          },
          params: {
            start_latitude: addr1.lat,
            start_longitude: addr1.long,
            end_latitude: addr2.lat,
            end_longitude: addr2.long,
          }
      }
      try{
        response = http.putUrl(config.get('uber.url'+'estimates/price/'), options);
        return response;
      } catch(err){
        console.log('ERROR showPrice',err)
      }
    }


  function availableDrivers(addr1, addr2){
    let response = null;
    console.log('add11, addr2',addr1, addr2)
    let options = {
        format: 'json', 
        headers: {
          'Accept-Language': 'ko_KR',
          'Content-Type': 'application/json'
        },
        body: {
          start_latitude: addr1.lat,
          start_longitude: addr1.long,
          end_latitude: addr2.latitude,
          end_longitude: addr2.longitude,
        }
    }
    try{
      response = http.oauthPutUrl(config.get('uber.url') +'/requests/estimate', options)
      return response;
    }catch(err){
      console.log('ERROR availableDrivers', err );
    }
  }

    function getProduct(addr){
    let response = null;
        console.log('addr',addr)
    let options = {
        format: 'json', 
        headers: {
          'Accept-Language': 'ko_KR',
          'Content-Type': 'application/json'
        },
        query: {
          'latitude': addr.latitude,
          'longitude': addr.longitude,
        }
    }
    try{
      response = http.oauthGetUrl(config.get('uber.url') +'/products', options)
      return response.products;
    }catch(err){
      console.log('ERROR availableDrivers', err );
    }
  }

  module.exports = {
    getPlace: getPlace,
    putPlace: putPlace,
    showPrice: showPrice,
    availableDrivers: availableDrivers,
    getProduct: getProduct
  }