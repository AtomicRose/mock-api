var fs = require('fs');
var debug = require('debug');

var doc = {
    create: function (filePath, basePath) {
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
                var tempPath = basePath ? (basePath + pathArray[i]) :
                    pathArray[i];
                var results = [];
                fs.readFile(tempPath, function (err, content) {
                    if (err) {
                        errorCount++;
                        fileCount--;
                        return callback(new Error(err));
                    } else {
                        var str = content.toString();
                        //match the api annotate block
                        var blocks = str.match(
                            /^\/\*\*\s*\*\s*\@start(?:.|\s)*\/\/\s*\@end$/
                        );
                        //match the tag/param/extra/uri/type/description in this block
                        for (var j = 0, blen = blocks.length; j <
                            blen; j++) {
                            pathArray.push(_matchBlockItem(
                                blocks[j]));
                        }
                        fileCount--;
                    }
                });
            }
        } else {
            debug('The param filePath typeof is string or array');
        }
    }
}
var regex = {
    id: /^\*\s*\@id.*/,
    _id: /^\*\s*\@id\s*/,
    requestType: /^\*\s*\@requestType.*/,
    _requestType: /^\*\s*\@requestType\s*/,
    tag: /^\*\s*\@tag.*/,
    _tag: /^\*\s*\@tag\s*/,
    description: /^\*\s*\@description.*/,
    _description: /^\*\s*\@description\s*/,
    param: /^\*\s*\@param.*/,
    _param: /^\*\s*\@param\s*/,
    extra: /^\*\s*\@extra.*/,
    _extra: /^\*\s*\@extra\s*/,
    uri: /^(?:get|post|delete|put)\((?:\'|\")(?:\w|\/|\\)*(?:\'|\")\)\s*\,\s*function$/
    _uri: /^(?:get|post|delete|put)\((?:\'|\")(?:\w|\/|\\)*(?:\'|\")\)\s*\,\s*function$/
}

function _matchBlockItem(str) {
    var apiObj = {};
    var ids = str.match(regex.id);
    var requestTypes = str.match(regex.requestType);
    var tags = str.match(regex.tag);
    var descriptions = str.match(regex.description);
    var params = str.match(regex.param);
    var extras = str.match(regex.extra);
    var uris = str.match(regex.uri);

    apiObj.id = ids && ids.length ? ids[0].replace() : '';
    apiObj.

}

module.exports = doc;
