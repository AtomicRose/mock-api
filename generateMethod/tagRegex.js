"use strict"

const tagRegex = {
    match: {
        id: /\*\s*\@id.*/g,
        requestType: /\*\s*\@requestType.*/g,
        tag: /\*\s*\@tag.*/g,
        fileTag: /\*\s*\@fileTag.*/g,
        description: /\*\s*\@description.*/g,
        param: /\*\s*\@param.*/g,
        extra: /\*\s*\@extra.*/g,
        uri: /\*\s*\@uri.*/g,
        method: /\*\s*\@method.*/g,
        author: /\*\s*\@author.*/g,
        fileDescription: /\*\s*\@fileDescription.*/g,
        baseUri: /\*\s*\@baseUri.*/g,
        system: /\*\s*\@system.*/g
        //uri: /(?:get|post|delete|put)\((?:\'|\")+(?:\w|\/|\\)*(?:\'|\")+\s*\,\s*function/g,
    },
    operate: {
        id: /\*\s*\@id\s*/g,
        requestType: /\*\s*\@requestType\s*/g,
        tag: /\*\s*\@tag\s*/g,
        fileTag: /\*\s*\@fileTag\s*/g,
        description: /\*\s*\@description\s*/g,
        param: /\*\s*\@param\s*/g,
        extra: /\*\s*\@extra\s*/g,
        uri: /\*\s*\@uri\s*/g,
        method: /\*\s*\@method\s*/g,
        author: /\*\s*\@author\s*/g,
        fileDescription: /\*\s*\@fileDescription\s*/g,
        baseUri: /\*\s*\@baseUri\s*/g,
        system: /\*\s*\@system\s*/g
        //uri1: /(?:get|post|delete|put)\((?:\'|\")+/g,
        //uri2: /(?:\'|\")+\s*\,\s*function/g
    },
    paramMatch: {
        key: /\{\s*key\:\s*\w*\}/,
        type: /\{\s*type\:\s*\w*\}/,
        required: /\{\s*required\:\s*\w*\}/,
        defalt: /\{\s*default\:\s*\w*\}/,
        desc: /\{\s*desc\:\s*.*\}/
    },
    paramOperate: {
        key: /\{\s*key\:\s*/,
        type: /\{\s*type\:\s*/,
        required: /\{\s*required\:\s*/,
        defalt: /\{\s*default\:\s*/,
        desc: /\{\s*desc\:\s*/
    }
}

module.exports = tagRegex;