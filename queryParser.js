var _ = require('underscore');

function replaceCharAt(s, pos, c) {
    return s.substring(0, pos) + c + s.substring(pos + 1);
}

var parser = module.exports = function (query) {
    var result = {
        include: [],
        exclude: []
    };

    if (_.isNull(query) ||
        _.isUndefined(query) ||
        _.isFunction(query) ||
        _.isEmpty(query) ||
        _.isObject(query) ||
        _.isNaN(query) ||
        _.isRegExp(query))
        throw 'Enter the valid input';

    if (!_.isString(query))
        throw 'Enter the valid input';

    if (query[0] === '^')
        query = replaceCharAt(query, 0, '');

    if (query[query.length] === '^')
        query = replaceCharAt(query, query.length, '');
       
    if (~query.indexOf('^')) {
        var splitedQuery = query.split('^');
        _.each(splitedQuery, function (item, index) {
            if(item) {
               if(splitedQuery[index -1] === '') {
                   result.exclude.push(item);
               } else {
                   result.include.push(item);
               }
            }
        });
    } else {
       result.include.push(query); 
    }

    console.log(result);
    return result;
};

parser('^sunny^parkash^^US');

