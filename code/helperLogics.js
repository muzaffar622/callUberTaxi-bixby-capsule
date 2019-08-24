 var config = require('config')
 var console = require('console')

 
/* 주소의 2번째 comma까지 만 받기 함수
 * 한글 주소를 영문으로 검색할때 주소 전체 다 입력하면 못 찾는 경우가 대부분이여서 덜 어렵게 찾기 위해
 * 주소의 앞 두 comma까지만 받아오는 함수다.
 */
function splitAddress(addr){
  let returnVal;
  try{
    if(addr){
      addr = addr.split(',')[0];
      returnVal = addr;
      return returnVal;
    }
  }catch(err){
    console.log('ERROR splitAddress', err)
    return null;
  }
}

/*
 * stringVal array 안에 inputVal sting text가 있는지 없는지 확인 해 주는 함수 
 */
function includedString(stringVal, inputVal){
  let result = null;
  if(inputVal !=undefined){
    try{
      return (stringVal.indexOf(String(inputVal)) > -1);
    } catch(err){
      return null;
      console.log('ERROR includedString', includedString);
    }
  }
}

/*
 * JSON으로 들어오는 주소에서 필요한 부분만 받기
 */
function checkKorJsonRoad(addr, lang){
  try{
    if(String(lang) == 'kor-kor' &&    //check korean address
       addr.results && 
       addr.results.juso &&
       addr.results.juso[0] &&
       addr.results.juso[0].roadAddr) return addr.results.juso[0].roadAddr
    else if(String(lang) == 'kor-eng' &&  // check english address
      addr.results && 
      addr.results.juso &&
      addr.results.juso[0] &&
      addr.results.juso[0].engAddr) return addr.results.juso[0].engAddr
    else if(String(lang) == 'eng-kor' &&  // check english address
      addr.results && 
      addr.results.juso &&
      addr.results.juso[0] &&
      addr.results.juso[0].korAddr) return addr.results.juso[0].korAddr
    else return false;
  } catch(err){
      console.log('ERROR checkKorJsonRoad', err)
      return false;
    }
}

module.exports = {
  includedString: includedString,
  splitAddress: splitAddress,
  checkKorJsonRoad: checkKorJsonRoad,
} 
  