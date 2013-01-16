/*
 * author maoshuyu
 * 微博接口
 */

var request = require('request')
  , querystring = require('querystring')
  , util = require('util')
  , _ = require('underscore')
  , setting = require('./setting')
  , cookie = require('./cookie').weibo
  , uid = setting.uid
  , headers = {
  	'Host': 'weibo.com',
  	'Content-Type': 'application/x-www-form-urlencoded',
  	'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11',
  	//必须写，否则可能请求失败。
	'Referer': util.format('http://weibo.com/u/%s', uid),
  	'Cookie': cookie	
  }
  ,	urls = {
    atList: 'http://weibo.com/aj/at/mblog/list',
    reply: 'http://weibo.com/aj/comment/add'
  };

/*
 * GET
 */
function getAtList(opt, cb) {
	var url = urls['atList'],
	cb = cb || function() {};
	params = {
		'__rnd': new Date().getTime(), 
		'wv': 5,
		'_t': 0 
	};

	//使用opt覆盖参数。
	_.extend(params, opt);	

	request({
		'url': url,
		'qs': params,
		'method': 'GET',	
		'headers': headers
	}, function(err, response, body) {
		if (err) {
			return;
		}
		if (response.statusCode == 200) {

			cb(response, querystring.parse(body));
		}
	});
} 

/*
 * POST
 */
function reply(opt, cb) {
	var url = urls['reply'],
	cb = cb || function() {},
	params = {
		'__rnd': new Date().getTime(), 
		'wv': 5
	},	
	data = {
    	'act':'post',
    	'forward':'0',
    	'isroot':'0',
    	'location':'home',
    	'module':'scommlist',
    	'group_source':'group_all',
    	'_t':'0'
	};

	//使用opt覆盖请求体。
	_.extend(data, opt);	

	request({
		'url': url,
		'method': 'POST',
		'headers': headers,
		'qs': params,
		'body': querystring.stringify(data)
	}, function(err, response, body) {
		if (err) {
			return;
		}
		if (response.statusCode == 200) {
			cb(response, querystring.parse(body));
		}
	});

}

exports.getAtList = getAtList;
exports.reply = reply;


