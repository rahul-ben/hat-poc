var Client = require('node-rest-client').Client;
client = new Client();
var async = require('async');

module.exports = function (options) {

    client.registerMethod("jsonMethod", "http://52.24.145.96/api/crawler/profiles?timeStamp=" +  options.timestamp, "GET");
    client.methods.jsonMethod(function (data, response) {
        // parsed response body as js Z
        async.eachSeries(data.items, function (singleProfile, next) {
            var model = {
                property: singleProfile,
                type: 'profile'
            };
            var stringProfile = JSON.stringify(model);
            var profiles = {
                field : stringProfile,
                data: model,
                url: 'http://52.24.145.96/api/crawler/profiles/' + singleProfile._id
            };
            var args = {
                headers: {
                    "Content-Type": "application/json"
                },
                data: profiles
            };
            client.put("http://redmine.m-sas.com:9200/myindex/profile/" + singleProfile._id, args,
                function (elasticSearchResponse, response) {
                    next()
                });
        }, function (err) {
            console.log('profiles returned');
        });
    });
    console.log('profiles returned');
}