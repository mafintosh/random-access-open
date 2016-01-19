var tape = require('tape')
var open = require('./')
var fs = require('fs')
var os = require('os')

var tick = 0

tape('random access write', function (t) {
  var name = tmp()
  open(name, function (err, fd) {
    t.error(err)
    fs.write(fd, new Buffer('hello'), 0, 5, 0, function (err, n) {
      t.error(err, 'no error')
      t.same(n, 5, 'wrote 5 bytes')
      fs.write(fd, new Buffer('world'), 0, 5, 0, function (err, n) {
        t.error(err, 'no error')
        t.same(n, 5, 'wrote 5 bytes')
        fs.close(fd, function (err) {
          t.error(err, 'no error')
          t.same(fs.readFileSync(name, 'utf-8'), 'world', 'overwrote file')
          cleanup(name)
          t.end()
        })
      })
    })
  })
})

tape('random access read', function (t) {
  var name = tmp()
  open(name, function (err, fd) {
    t.error(err)
    fs.write(fd, new Buffer('hello'), 0, 5, 0, function (err, n) {
      t.error(err, 'no error')
      t.same(n, 5, 'wrote 5 bytes')
      fs.read(fd, new Buffer(5), 0, 5, 0, function (err, n, buf) {
        t.error(err, 'no error')
        t.same(n, 5, 'read 5 bytes')
        t.same(buf.toString(), 'hello')
        fs.close(fd, function (err) {
          t.error(err, 'no error')
          cleanup(name)
          t.end()
        })
      })
    })
  })
})

tape('random access write with old file', function (t) {
  var name = tmp()
  fs.writeFileSync(name, 'hello world')
  open(name, function (err, fd) {
    t.error(err)
    fs.write(fd, new Buffer('world'), 0, 5, 0, function (err, n) {
      t.error(err, 'no error')
      t.same(n, 5, 'wrote 5 bytes')
      fs.close(fd, function (err) {
        t.error(err, 'no error')
        t.same(fs.readFileSync(name, 'utf-8'), 'world world', 'overwrote file')
        cleanup(name)
        t.end()
      })
    })
  })
})

tape('random access append with old file', function (t) {
  var name = tmp()
  fs.writeFileSync(name, 'hello world')
  open(name, function (err, fd) {
    t.error(err)
    fs.write(fd, new Buffer(' verden'), 0, 7, 11, function (err, n) {
      t.error(err, 'no error')
      t.same(n, 7, 'wrote 7 bytes')
      fs.close(fd, function (err) {
        t.error(err, 'no error')
        t.same(fs.readFileSync(name, 'utf-8'), 'hello world verden', 'appended to file')
        cleanup(name)
        t.end()
      })
    })
  })
})

function cleanup (name) {
  try {
    fs.unlinkSync(name)
  } catch (err) {
    // do nothing
  }
}

function tmp () {
  return os.tmpdir() + '/' + process.pid + '-' + Date.now() + '-' + (tick++)
}
