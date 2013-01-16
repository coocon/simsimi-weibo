/*
 * author maoshuyu
 */
var reply = require('./weibo').reply
  , mid = process.argv[2]
  , uid = process.argv[3]
  , msg = process.argv[4];

var simsimi = require('../server/simsimi');
var reg = /@__geepper__\<\\\/a\>(.*)\<\\\/em\>/;
var arr = msg.match(reg);
if (arr) {
    msg = arr[1];
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' + msg);
}

simsimi.ask(msg, function(res) {
    var str = '我爱北京天安门' + new Date();
    if (res.status == 0) {
        str = res.data.response; 
    }
    console.log(str);
    reply({
        'mid': mid,
        'uid': uid,
        'content': str 
    }, function(response, body) {
        process.send(body);
        process.exit(1);
    });
})

