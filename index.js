var fs = require('fs')

module.exports = open

function open (filename, cb) {
  fs.open(filename, 'r+', function (err, fd) {
    if (!err) return cb(null, fd)
    fs.open(filename, 'a', function (err, fd) {
      if (err) return cb(err)
      fs.close(fd, function (err) {
        if (err) return cb(err)
        fs.open(filename, 'r+', cb)
      })
    })
  })
}
