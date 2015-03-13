# Simple little webapp to generate a tar command

No decent archive manager that is open source exists for OSX
This is not really a manager, at least not yet.

Just a dirty app I threw together in an hour or so.

At some point I will make the code cleaner.

Tested on iojs-1.5.3

```
$ cd http
$ bower install
$ cd ..
$ npm install
$ cd http
$ python -m SimpleHTTPServer
Open new terminal
$ node app.js <dir to scan>
Open localhost:8000
```

