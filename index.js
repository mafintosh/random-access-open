var fs = require('fs')
var c = require('constants')

module.exports = open

function open (filename, cb) {
  var mode = c.O_RDWR | c.O_CREAT
  fs.open(filename, mode, cb)
}
