 var config = require('config')
 var secret = require('secret')
 var http = require('http')
 var console = require('console')
 var helper = require('./helperLogics.js')

module.exports.function = function myProfile () {
  var id = secret.get('uberClientId');
  var pwd = secret.get('uberClientSecret');
  var endpointAccess = config.get('endpointAccess.url');
  var endpointToken = config.get('endpointToken.url');
  var redirectUrl = config.get('redirect.url');
  
      var options = {
    format: 'json',
    headers: {
      'Authorization': 'Bearer ' + config.get('devAccess.url'),
      'Accept-Language': 'ko_KR',
      'Content-Type': 'application/json'
    },
  };
  
 var request = http.getUrl( config.get('myProfile.url'), options)
 return request;
}