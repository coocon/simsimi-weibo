/*
 * author maoshuyu
 */

var _ = require('underscore')
  , getAtList = require('./weibo').getAtList;

function result(data) {
	var keys = ['mid', 'uid', 'name', 'wvr']; 
	data = _.pick(data, keys),
	values = _.values(data),
	result = [];
	_.each(keys, function(key, i) {
		_.each(values[i], function(value, index) {
			if (!result[index]) {
				result[index] = {};
			}
			result[index][key] = value;	
		});
	});
	return result;
}

getAtList({
	'page': 1,
	'count': 15
}, function(response, body) {
	//将返回值转化一下
	process.send(result(body));
	process.exit(1);
});
