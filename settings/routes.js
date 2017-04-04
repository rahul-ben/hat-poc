var ELApi = require('../apis/elasticSearchApi');

module.exports.configure = function(app) {
    app.get('/', require('../controllers').home);
    app.get('/search', ELApi.search);
    app.get('/toQueryParser', ELApi.toQueryParser)
};