/*
 * author maoshuyu
 */
var reply = require('./weibo').reply
  , mid = process.argv[2]
  , uid = process.argv[3];

reply({
	'mid': mid,
	'uid': uid,
	'content': '我爱北京天安门' + mid + uid
}, function(response, body) {
	console.log(body)
	process.send(body);
	process.exit(1);
});
