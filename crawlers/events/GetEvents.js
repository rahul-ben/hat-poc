var Client = require('node-rest-client').Client;
client = new Client();
var async = require('async');


/*
 *  export the method that take  only parmater options.
 *  define the crawler accordingly your requirement.
 *  use adpater here and no need of callback. 
 */

module.exports = function (options) {

    client.registerMethod("jsonMethod", "http://52.24.145.96/api/crawler/posts?timeStamp=" +  options.timestamp, "GET");
    client.methods.jsonMethod(function (data, response) {
        // parsed response body as js Z
        async.eachSeries(data.items, function (singlePost, next) {
            var model = {
                property: singlePost,
                type: 'event'
            };
            var stringPost = JSON.stringify(model);
            var posts = {
                field : stringPost,
                data: model,
                url: 'http://52.24.145.96/api/crawler/posts/' + singlePost._id
            };
            var args = {
                headers: {
                    "Content-Type": "application/json"
                },
                data: posts
            };
            client.put("http://redmine.m-sas.com:9200/myindex/post/" + singlePost._id, args,
                function (elasticSearchResponse, response) {
                    next()
                });
        }, function (err) {
            console.log('Event returned');
        });
    });
};