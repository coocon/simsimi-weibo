var config = require('./config');
/**
 * @param  {string} host host信息
 * @param {string} msg 消息
 * @param {string} cookie信息
 */
var port = config.PORT;
var host = config.HOST;

var makeOptions = function(host, msg, cookie) {
    if (!msg) {
        console.log('say something');
        return null; 
    }
    var url = 'http://www.simsimi.com';
    var url4 = 'http://106.187.43.200';
    var url5 = 'http://127.0.0.1:8888';
    url5 = host || url5;
    msg = msg || 'hello';
    cookie = cookie || '';
    var options =  {
        
        'method': 'GET',
        'path': '/func/req?msg=' + msg + '&lc=zh',
        'port': port,
        'hostname': host,
        'headers': {
            "Connection": 'keep-alive',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11',
            'Accept-Charset': 'GBK,utf-8;q=0.7,*;q=0.3',
            'Accept-Language': 'zh-CN,zh;q=0.8',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json; charset=utf-8',
            'Cookie': cookie,
            'Referer': 'http://www.simsimi.com/talk.htm'
        }
    };
    return options; 
}

exports.makeOptions = makeOptions
