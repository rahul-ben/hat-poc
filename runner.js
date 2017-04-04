var fs = require('fs');
var join = require('path').join;
var schedule = require('node-schedule');
var every = require('every-moment');
var Client = require('node-rest-client').Client;
client = new Client();

var retriveFile = function (path, options) {
    fs.readdirSync(join(path)).forEach(function (dirEntity) {
        var file = fs.lstatSync(join(path, dirEntity));
        if (file.isFile() && ~ dirEntity.indexOf('.js')) {
            var crawler = require(join(path, dirEntity));
            if(crawler && typeof(crawler) == 'function') {
                return crawler(options);
            }
        }
        if (file.isDirectory()) {
            return retriveFile(join(path, dirEntity), options);
        }
    });
};

var runner = module.exports = function (timestamp) {
    retriveFile(join(__dirname, './crawlers'), { timestamp: timestamp });
};

var timer = every(10, 'minutes', function() {
    var date = new Date().toISOString();
    var args = {
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            "lastUpdated": date
        }
    };
    client.get("http://redmine.m-sas.com:9200/myindex/timeStamp/1",
        function (oldTimeStamp, response) {
            client.put("http://redmine.m-sas.com:9200/myindex/timeStamp/1", args,
                function (elasticSearchResponse, response) {
                    runner(oldTimeStamp._source.lastUpdated);
                });
        })
});


