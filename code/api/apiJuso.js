var config = require('config')
var http = require('http')
var helperLogics = require('helperLogics')
var console = require('console')

/* 한글 주소를 사용자에게 보여 주는 함수
 * if lang = 'kor-kor', result address in korean (input KOR ADDR - > KOR ADDR)
 * if lang = 'kor-eng', result address in english (input KOR ADDR - > ENG ADDR)
 * if lang = 'eng-kor', result address in english (input ENG ADDR - > KOR ADDR)
 */
function getAddr(address, lang){ 
  let request = result = url = key = null;
  switch(lang){
    case 'kor-kor':
    case 'kor-eng':
      key = config.get('jusoKor.key')
      url = config.get('jusoKor.url')
      break;
    case 'eng-kor':
      key = config.get('jusoEng.key')
      url = config.get('jusoEng.url')
      address = helperLogics.splitAddress(address);
      break;
    default:
      break;
  }
  let options = {
    format: 'json',
    query: {
      'confmKey': key,
      'keyword': String(address),
      'resultType': 'json',
      'currentPage': 1
    }
  }
  request = http.getUrl(url, options)
  try{
    result = helperLogics.checkKorJsonRoad(request, lang);
    if(result) return result;
  } catch(err){
    console.log('ERROR getAddrKor', err);
    return null;
  }
}

module.exports = {
  getAddr: getAddr
}


