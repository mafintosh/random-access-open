# random-access-open

Open a file for random access read / write and create the file if it doesn't exist

```
npm install random-access-open
```

## Usage

``` js
var open = require('random-access-open')
var fs = require('fs')

open('hello.txt', function (err, fd) {
  fs.write(fd, new Buffer('hello'), 0, 5, 0, function () {
    fs.write(fd, new Buffer('world'), 0, 5, 0, function () {
      fs.close(fd, function () {
        // prints "world"
        console.log(fs.readFileSync('hello.txt', 'utf-8'))
      })
    })
  })
})
```

## License

MIT
