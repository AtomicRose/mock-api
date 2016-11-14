'use strict'

const fs = require('fs');
const logger = require('../helper/logger');
const tagRegex = require('./tagRegex');

let fileBlock = {};
fileBlock.get = (filePath, callback)=> {
    let tempPath = filePath;
    fs.open(tempPath, 'r+', (err, fd)=> {
        if (err) {
            logger.error(err);
        }
        readIt(fd, callback);
    });
};
function readIt(fd, callback) {
    let buf = new Buffer(64);
    let readBytes = 0;
    let content = '';
    let lastStr = '';
    let result = [];
    _read();
    function _read() {
        fs.read(fd, buf, 0, buf.length, null, (err, bytes, buf)=> {
            if (err) {
                logger.error(err);
            }
            readBytes = readBytes + bytes;
            let bufStr = buf.slice(0, bytes).toString();
            //split lastStr add this line. then push the matched line to the array.
            let split_a = (lastStr + bufStr).split('\r\n');
            //if the array length >2 . Operate the array except the last.
            if (split_a.length > 1) {
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
            lastStr = split_a[split_a.length - 1];

            content += bufStr;
            if (bytes === buf.length) {
                _read();
            } else {
                callback(result);
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
            return {
                tag: key,
                value: tempArray[0].replace(tagRegex.operate[key], '')
            }
        }
    }
    return false;
}

fileBlock.get('api_package/cms.js', function (data) {
    logger.debug(data.length);
});

module.exports = fileBlock;