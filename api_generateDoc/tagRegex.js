"use strict"

const tagRegex = {
    match: {
        id: /\*\s*\@id.*/g,
        requestType: /\*\s*\@requestType.*/g,
        tag: /\*\s*\@tag.*/g,
        description: /\*\s*\@description.*/g,
        param: /\*\s*\@param.*/g,
        extra: /\*\s*\@extra.*/g,
        uri: /\*\s*\@uri.*/g,
        //uri: /(?:get|post|delete|put)\((?:\'|\")+(?:\w|\/|\\)*(?:\'|\")+\s*\,\s*function/g,
    },
    operate: {
        id: /\*\s*\@id\s*/g,
        requestType: /\*\s*\@requestType\s*/g,
        tag: /\*\s*\@tag\s*/g,
        description: /\*\s*\@description\s*/g,
        param: /\*\s*\@param\s*/g,
        extra: /\*\s*\@extra\s*/g,
        uri: /\*\s*\@uri\s*/g,
        //uri1: /(?:get|post|delete|put)\((?:\'|\")+/g,
        //uri2: /(?:\'|\")+\s*\,\s*function/g
    }
}

module.exports = tagRegex;