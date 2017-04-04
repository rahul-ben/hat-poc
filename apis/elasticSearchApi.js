var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({ host: 'redmine.m-sas.com:9200', log: 'trace' });
var queryParser = require('../queryParser');
var Client = require('node-rest-client').Client;
var async = require('async');
var _  = require('underscore');

exports.search = function(req, res) {
    var path = "http://10.0.0.2:9200/myindex/_search?q=" + req.query.keyword + "&pretty=true";
    console.log('service hit');
    client.get(path, function (data, response) {
        console.log(data+ 'is data?');
        res.json(data)
    })
};

exports.toQueryParser = function(req, res) {
    var queryObject = queryParser(req.query.keyword);
    var mustInclude = [];
    var mustNotInclude = [];
    _.each(queryObject.include, function (item) {
        var mustMatchObject = {
            match: {field: item}
        };
        mustInclude.push(mustMatchObject);
    });
    if (queryObject.exclude.length > 0) {
        _.each(queryObject.exclude, function (item) {
            var mustNotMatchObject = {
                match: {field: item}
            };
            mustNotInclude.push(mustNotMatchObject);
        });
        var elasticQuery = {
            bool: {
                must: mustInclude,
                must_not: mustNotInclude
            }
        };
        var jsonElasticQuery =  JSON.parse(JSON.stringify(elasticQuery));
    } else {
        var elasticQuery = {
            bool: {
                must: mustInclude
            }
        };
        var jsonElasticQuery =  JSON.parse(JSON.stringify(elasticQuery));
    }
    client.search({
        body: {
            query: jsonElasticQuery
        }
    }).then(function (resp) {
        res.json(resp)
    }, function (err) {
        console.trace(err.message);
    });
};
