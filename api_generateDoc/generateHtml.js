const fileBlock = require("./fileBlock");
const fs = require("fs");
const logger = require("../helper/logger");
const path = require("path");
const util = require("util");

var generateHtml = {};
generateHtml.create = function (dirPath) {

};
var result = [];
var count = 0;
function readDir(dirPath) {
    var files = fs.readdirSync(dirPath);
    for (var i = 0; i < files.length; i++) {
        var info = fs.lstatSync(dirPath + '/' + files[i]);
        if (info.isDirectory()) {
            readDir(dirPath + '/' + files[i])
        }
        if (info.isFile()) {
            count++;
            fileBlock.get(dirPath + '/' + files[i], function (data, filePath) {
                result.push({
                    pathObj: path.parse(filePath),
                    blockObj: data
                });
                count--;
                if (count === 0) {
                    //TODO generate html files
                    for (var j = 0; j < result.length; j++) {
                        writeToJson(result[j]);
                    }
                }
            })
        }
    }
}


function writeToJson(o) {
    var resolvePath = path.resolve(__dirname, path.format(o.pathObj));
    var splitArray = resolvePath.split('api_package');
    var po = path.parse(splitArray[splitArray.length - 1]);
    logger.debug(splitArray[splitArray.length - 1]);
    var writeDir = path.resolve('../', path.join('generate_file/data'));
    // var writeDir = path.resolve('../', path.join('generate_file/data', po.dir));
    logger.debug(po.dir);

    var fileName = o.pathObj.name + '_' +(new Date()).getTime().toString() + '.json';

    var recordObj = {}
    recordObj[po.dir] = fileName;
    logger.debug(recordObj);
    //TODO

    fs.writeFile(path.join(writeDir, fileName), JSON.stringify(o.blockObj), function (err) {
        if (err) {
            logger.error(err);
        }
    });

    // fs.stat(writeDir, function (err, stat) {
    //     if (err) {
    //         if (err.errno === -4058) {
    //             fs.mkdir(writeDir, function (err) {
    //                 if(err.errno === -4075){
    //                     doWrite(path.join(writeDir, o.pathObj.name+'.json'), JSON.stringify(o.blockObj));
    //                 }else{
    //                     logger.error(err);
    //                     return false;
    //                 }
    //             });
    //         }else{
    //             logger.error(err);
    //             return false;
    //         }
    //         return false;
    //     }
    //     if(stat && stat.isDirectory()){
    //         doWrite(path.join(writeDir, o.pathObj.name+'.json'), JSON.stringify(o.blockObj));
    //     }else{
    //         fs.mkdir(writeDir, function (err) {
    //             if(err.errno === -4075){
    //                 doWrite(path.join(writeDir, o.pathObj.name+'.json'), JSON.stringify(o.blockObj));
    //             }else{
    //                 logger.error(err);
    //                 return false;
    //             }
    //         });
    //     }
    // });
    //
    // function doWrite(path, content){
    //     fs.writeFile(path, content, function (err) {
    //         if (err) {
    //             logger.error(err);
    //         }
    //     });
    // }

    // fs.readdir(writeDir, function(err, files){
    //     if(err){
    //         if(err.errno === -4058){
    //             fs.mkdir(writeDir, function(err){
    //                 console.log(err);
    //                 //logger.error(err);
    //             });
    //         }else{
    //             logger.error(err);
    //             return false;
    //         }
    //     }
    // });

    logger.info(writeDir);

    //logger.debug(sep);
    // fs.writeFile(writeDir, function (err) {
    //     if (err) {
    //         logger.error(err);
    //     }
    // });
}

readDir(path.join('../api_package'));

module.exports = generateHtml;