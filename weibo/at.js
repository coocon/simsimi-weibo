/*
 * author maoshuyu
 */

var _ = require('underscore')
  , getAtList = require('./weibo').getAtList
  , max_id = process.argv[3]
  , end_id = process.argv[2]
  , opt = {
  	'page': '1',
	'count': '15'
  }; 

/*
 * 将返回的结果转化为数组。
 */
function result(data) {
	var keys = ['mid', 'uid', 'name', 'wvr'],
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

/*
 * 回调函数。
 */
function callback(response, body) {
	process.send(result(body));
	process.exit(1);
}

if (max_id) {
	_.extend(opt, {
		'max_id': max_id,
		'end_id': end_id,
		'pre_page': 1
	});
}
getAtList(opt, callback);

