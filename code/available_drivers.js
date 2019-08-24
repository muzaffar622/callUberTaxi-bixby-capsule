var console = require('console')
var config = require('config')
var http = require('http')
var helperLogics = require('helperLogics.js')
var api = require('api.js')
var uber = require('api/apiUber.js')

module.exports.function = function available_drivers (input_start_point) {
    let products = uber.getProduct(input_start_point.point);
  return products
}
