'use strict'

const fs = require('fs');
const logger = require('../helper/logger');
const tagRegex = require('./tagRegex');
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf-8');

let fileBlock = {};
fileBlock.get = (filePath, callback)=> {
    let tempPath = filePath;
    fs.open(tempPath, 'r+', (err, fd)=> {
        if (err) {
            logger.error(err);
        }
        readIt(fd, filePath, callback);
    });
};
function readIt(fd, filePath, callback) {
    let buf = new Buffer(8192);
    let readBytes = 0;
    let content = '';
    let lastStr = '';
    let result = [];
    _read();
    function _read() {
        fs.read(fd, buf, 0, buf.length, null, function(err, bytes, buf) {
            if (err) {
                logger.error(err);
            }
            readBytes = readBytes + bytes;
            let allBuf = Buffer.concat([Buffer.from(lastStr), buf])
            let bufStr = allBuf.toString();

            //split lastStr add this line. then push the matched line to the array.
            let split_a = (lastStr + bufStr).split('\r\n');
            //if the array length >2 . Operate the array except the last.
            if (split_a.length > 1) {
                lastStr = '';
                for (let i = 0, len = split_a.length; i < len - 1; i++) {
                    //match this line
                    let docObj = matchLine(split_a[i]);
                    //if not false. The str match the regex
                    if(docObj){
                        result.push(docObj);
                    }
                }
            }
            // add the last item to the lastStr
            lastStr += split_a[split_a.length - 1];

            content += bufStr;
            if (bytes === buf.length) {
                _read();
            } else {
                callback(result, filePath);
                fs.close(fd, function () {
                    logger.info('close success');
                });
            }
        });
    }
}

function matchLine(str){
    for(let key in tagRegex.match){
        var tempArray = str.match(tagRegex.match[key]);
        if(tempArray){
            if(key == 'param'){
                var tempVal = tempArray[0].replace(tagRegex.operate[key], '');
                var valObj = {};
                for(let k in tagRegex.paramMatch){
                    var ta = tempVal.match(tagRegex.paramMatch[k]);
                    if(ta){
                        valObj[k] = ta[0].replace(tagRegex.paramOperate[k], '').replace(/\}/,'');
                    }
                }
                return {
                    tag: key,
                    value: valObj
                }
            }
            return {
                tag: key,
                value: tempArray[0].replace(tagRegex.operate[key], '')
            }
        }
    }
    return false;
}

// fileBlock.get('../api_package/cms.js', function (data) {
//     logger.debug(data.length);
// });

module.exports = fileBlock;