var Client = require('node-rest-client').Client;
client = new Client();


module.exports.search = function (req, res) {
    var query = req.body.query;
    client.registerMethod("jsonMethod", 'http://localhost:9200/blog/_search?q=' + query.search + '&pretty=true', "GET");
    client.methods.jsonMethod(function (data, response) {
        res.json(data)
    })
};
