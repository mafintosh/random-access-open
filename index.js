var fs = require('fs')
var c = require('constants')

var mode = c.O_RDWR | c.O_CREAT

open.sync = sync
module.exports = open

function open (filename, cb) {
  fs.open(filename, mode, cb)
}

function sync (filename, cb) {
  return fs.openSync(filename, mode)
}
