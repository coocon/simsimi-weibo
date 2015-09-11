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
    var url = 'www.simsimi.com';
    var url4 = 'http://106.187.43.200';
    var url5 = 'http://127.0.0.1:8888';
    msg = msg || 'hello';
    cookie = cookie || '';
    cookie = 'uid=68126848; _ga=GA1.2.81101600.1441685343; _gat=1';
    var options =  {
        
        'method': 'GET',
        'path': '/requestChat?req=' + msg + '&lc=zh&ft=1.0&uid=68126848',
        'port': port,
        'host': url,
        'headers': {
            "Connection": 'keep-alive',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36',
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
