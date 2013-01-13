var request = require('request');
var http = require('http');
var cookie = null;
var ready = false;
var headers = require('./headers');
var buffer = new Buffer(0);
/**
 * 主要获取simsimi的cookie信息
 */
function getHtml(type, callback) {
    var path = '/talk.htm';
    if (type == 'teach') {
        path = '/teach.htm'; 
    }
    var options = {
        hostname: 'www.simsimi.com',
        port: 80,
        path: path,
        agent: false,
        method: 'GET'
    };
    console.log('hi ', options);
    var req = http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        cookie = res.headers['set-cookie'].toString();
        cookie = cookie.split(';').shift();
        cookie += ';sagree=true';

        res.on('data', function(chunk) {
            //   console.log('BODY: ' + chunk);
            //console.log( 'hi ,what up');
        });

        res.setEncoding('utf8');

        res.on('end', function(chunk) {
            ready = true;
            console.log('end'); 
            if (callback) {
                callback(); 
            }       
            
        
        })
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    req.write('data\n');
    // write data to request body
    req.end();
}

/**
 * 初始化函数
 * @param {function()} callback 回调函数
 */
function init(callback) {
    getHtml('talk', callback)
}
/**
* 两个buffer对象加起来
*/
function buffer_add(buf1, buf2) {

    var re = new Buffer(buf1.length + buf2.length);
    buf1.copy(re);
    buf2.copy(re,buf1.length);
    return re;
}

/**
 * @param {string} question
 * @param {Function()} callback
 */
function ask(question, callback) {
    //每次初始化
    var buffer = new Buffer(0);

    if (!ready) {
        init(function() {
           ask(question, callback); 
        }); 
    }
    else {
        // do ask thing
        var opts = headers.makeOptions(null, question, cookie);
        //console.log('hi...............................', opts);
        var req = http.get(opts, function(res) {
            if (res.body) {
                console.log(res.body); 
            }
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
                buffer = buffer_add(buffer, chunk);
            });
            
            res.on('end', function(o) {

                //console.log('hi:end', buffer);
                var str = buffer.toString('utf8');
                var obj = {};
                try {
                    var data = JSON.parse(str);
                    obj.status = 0;
                    obj.data = data;
                }
                catch(e) {

                    console.log('json_parse_error:', str);  
                    obj.status = 100;
                    obj.data = str;
                }
                if (callback) {
                    callback(obj); 
                } 
            })
              
        });
        req.on('error', function(e) {
        
            console.log('error', e); 
        });
        req.end();
    }
}

/**
 * init完成后的回调
 * @param {Function()} callback
 */
exports.ask = ask


