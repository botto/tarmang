var restify = require('restify');
var fs = require('fs');
var async = require('async');
var program = require('commander');
var path = require('path');
var uuid = require('node-uuid');

program
  .version('0.0.1')
  .option('-d, --directory <dir>', 'The base directory to get scan')
  .parse(process.argv);

var server = restify.createServer(
  { name: 'tarmang-api' }
);

server.use(restify.fullResponse());

var dir = program.directory || '.';

server.get('/', function(req, res, next) {
  var filesInfo = {};
  fs.readdir(dir, function(err, files) {
    async.waterfall([
      function(cb) {
        files.forEach(function(file, index, filesArray) {
          var filePath = path.join(dir, file);
          fs.stat(filePath, function(err, fileStat) {
            if (err) {
              console.error(err);
            }
            filesInfo[uuid.v4()] = {
              'name': file,
              'isFile': fileStat.isFile(),
              'isDirectory': fileStat.isDirectory(),
            };

            var last = (filesArray.length - index) === 1;
            cb(err, filesInfo, last);
          });
        });
      }],
      function(err, result, last) {
        if (last) {
          res.send(JSON.stringify(result));
          next();
        }
      }
    );
  });
});


server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url);
  console.log('Scanning %s', dir);
})
