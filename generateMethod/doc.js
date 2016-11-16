var fs = require('fs');
var util = require('util');

var doc = {
    create: function (filePath, basePath, callback) {
        var fileCount = 0;
        var errorCount = 0;
        var pathArray = [];
        if (typeof filePath === 'string') {
            fileCount = 1;
            pathArray[0] = filePath;
        }
        if (typeof filePath === 'object' && filePath.length) {
            fileCount = filePath.length;
            pathArray = filePath;
        }
        if (fileCount) {
            for (var i = 0, len = pathArray.length; i < len; i++) {
                var tempPath = pathArray[i];
                var results = [];
                fs.open(tempPath, 'r+', (err, fd)=> {
                    if(err){
                        return console.error(err);
                    }
                    readIt(fd, callback);
                });
                function readIt(fd, callback){
                    var buf = new Buffer(64);
                    var readBytes = 0;
                    var content='';
                    _read();
                    function _read(){
                        fs.read(fd,buf, 0, buf.length, null, (err,bytes, buf)=>{
                            if(err){
                                return util.debug(err);
                            }
                            readBytes = readBytes + bytes;
                            content += buf.slice(0, bytes).toString();
                            if(bytes === buf.length){
                                _read();
                            }else{
                                util.debug('-----------------');
                                util.debug(content);
                                callback(content);
                                fs.close(fd, function(){
                                    console.log('close success');
                                });
                            }
                        });
                    }
                }
            }
        } else {
            return 'filePath error';
        }
    }
}
var regex = {
    id: /^\*\s*\@id.*/g,
    _id: /^\*\s*\@id\s*/g,
    requestType: /^\*\s*\@requestType.*/g,
    _requestType: /^\*\s*\@requestType\s*/g,
    tag: /^\*\s*\@tag.*/g,
    _tag: /^\*\s*\@tag\s*/g,
    description: /^\*\s*\@description.*/g,
    _description: /^\*\s*\@description\s*/g,
    param: /^\*\s*\@param.*/g,
    _param: /^\*\s*\@param\s*/g,
    extra: /^\*\s*\@extra.*/g,
    _extra: /^\*\s*\@extra\s*/g,
    uri: /(?:get|post|delete|put)\((?:\'|\")+(?:\w|\/|\\)*(?:\'|\")+\s*\,\s*function/g,
    _uri1: /(?:get|post|delete|put)\((?:\'|\")+/g,
    _uri2: /(?:\'|\")+\s*\,\s*function/g
}

function _matchBlockItem(str, basePath) {
    var apiObj = {};
    var ids = str.match(regex.id);
    var requestTypes = str.match(regex.requestType);
    var tags = str.match(regex.tag);
    var descriptions = str.match(regex.description);
    var params = str.match(regex.param);
    var extras = str.match(regex.extra);
    var uris = str.match(regex.uri);

    apiObj.id = ids ? ids[0].replace(regex._id, '') : '';
    apiObj.requestType = requestTypes ? requestTypes[0].replace(regex._requestType, '') : '';
    apiObj.tags = tags ? tags[0].replace(regex._tag, '') : '';
    apiObj.description = descriptions ? descriptions[0].replace(regex._description, '') : '';
    apiObj.params = [];
    if (params) {
        for (var i = 0, len = params.length; i < len; i++) {
            var tempStr = params[i].replace(regex._param, '');
            var paramObj = {};
            paramObj.key = tempStr.match(/^\{key\:\s*\w*\s*\}$/g)[0].replace(/^\{key\:\s*/, '').replace(/\}$/, '');
            paramObj.type = tempStr.match(/^\{type\:\s*\w*\s*\}$/g)[0].replace(/^\{type\:\s*/, '').replace(/\}$/, '');
            paramObj.required = tempStr.match(/^\{required\:\s*\w*\s*\}$/g)[0].replace(/^\{required\:\s*/, '').replace(/\}$/, '');
            paramObj.type = tempStr.match(/^\{default\:\s*\w*\s*\}$/g)[0].replace(/^\{default\:\s*/, '').replace(/\}$/, '');
            paramObj.desc = tempStr.match(/^\{desc\:\s*.*\s*\}$/g)[0].replace(/^\{desc\:\s*/, '').replace(/\}$/, '');
            apiObj.params.push(paramObj);
        }
        apiObj.params = params;
    }
    apiObj.extra = extras ? extras[0].replace(regex._extra, '') : '';
    apiObj.uri = (basePath ? basePath : '') + (uris ? uris[0].replace(regex._uri1, '').replace(regex._uri2, '') : '');
    return apiObj;
}

module.exports = doc;
