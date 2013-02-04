/**
 *  一些工具
 */
var crypto = require('crypto');
var md5 = function(str) {
    var cryMD5 = crypto.createHash('md5');
    var result = '';
    if (str != undefined) {
    
        cryMD5.update(str);
        result = cryMD5.digest('hex');
    }
    return result;

}
exports.md5 = md5;

//test for md5
//
//var str = md5('coocon2007@gmail.com');
//console.log(str);
