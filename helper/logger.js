"use strict"
const util = require('util');

let logger = {};
let toString = (o)=> {
    let  obj = o;
    if(typeof obj === 'object'){
        return JSON.stringify(obj);
    }
    return obj.toString();
}
logger.info = (info)=> {
    console.log('INFO:' + toString(info) + '\n----------');
}
logger.log = (info)=> {
    console.log('LOG:' + toString(info) + '\n----------');
}
logger.error = (info)=> {
    console.log('ERROR:' + toString(info) + '\n----------');
}
logger.debug = (info)=> {
    console.log('DEBUG:' + toString(info) + '\n----------');
}

module.exports = logger;