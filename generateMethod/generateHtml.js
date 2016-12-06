const fileBlock = require("./fileBlock");
const fs = require("fs");
const logger = require("../helper/logger");
const path = require("path");
const util = require("util");

var result = [];
var count = 0;
var generateHtml = {};
generateHtml.create = function (dirPath, callback) {
    result = [];
    count = 0;
    readDir(dirPath, callback)
};

function readDir(dirPath, callback) {
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
                    var sc = result.length;
                    for (var j = 0; j < result.length; j++) {
                        writeToJson(result[j], function(value){
                            if(value===true){
                                sc--;
                            }else{
                                callback(value);
                                return false;
                            }
                        });
                    }
                    var writeInterval = setInterval(function(){
                        if(sc===0){
                            callback(true);
                            clearInterval(writeInterval);
                        }
                    }, 200);
                }
            })
        }
    }
}


function writeToJson(o, callback) {
    var resolvePath = path.resolve(__dirname, path.format(o.pathObj));
    var splitArray = resolvePath.split('api_package');
    var po = path.parse(splitArray[splitArray.length - 1]);
    var writeDir = path.join(__dirname, '../generate_file/data');

    var fileName = o.pathObj.name + '_' + (new Date()).getTime().toString() + '.json';

    var content = fs.readFileSync(path.join(__dirname, '../generate_file/contrast.json'));
    if (content) {
        var recordObj = content.toString() ? JSON.parse(content.toString()) : {};
        var currentContrast = {};
        for (var i = 0, len = o.blockObj.length; i < len; i++) {
            if (o.blockObj[i].tag === 'system') {
                currentContrast.system = o.blockObj[i].value;
            }
            if (o.blockObj[i].tag === 'fileTag') {
                currentContrast.fileTag = o.blockObj[i].value;
            }
            if (o.blockObj[i].tag === 'fileDescription') {
                currentContrast.fileDescription = o.blockObj[i].value;
            }
            if (currentContrast.hasOwnProperty('system') && currentContrast.hasOwnProperty('fileTag') && currentContrast.hasOwnProperty('fileDescription')) {
                break;
            }
        }
        if (!currentContrast.hasOwnProperty('system')) {
            currentContrast.system = 'unknown';
        }
        if (!currentContrast.hasOwnProperty('fileTag')) {
            currentContrast.fileTag = 'unknownFile';
        }
        if (!recordObj[currentContrast.system]) {
            recordObj[currentContrast.system] = {};
        }
        if(!recordObj[currentContrast.system][currentContrast.fileTag]){
            recordObj[currentContrast.system][currentContrast.fileTag] = {};
            recordObj[currentContrast.system][currentContrast.fileTag].pastFiles = [];
        }

        if (recordObj[currentContrast.system][currentContrast.fileTag]) {
            var str = 'LOG:' + (new Date()).toString() + '\n';
            str += 'The System of: ' + currentContrast.system + ' & fileTag of: ' + currentContrast.fileTag + '. Have modify the contrast json file FROM ' + recordObj[currentContrast.system][currentContrast.fileTag].currentFile + ' TO ' + fileName + '\n';
            fs.appendFileSync(path.join(__dirname, '../generate_file/log/contrast.log'), str);
        }
        recordObj[currentContrast.system][currentContrast.fileTag].currentFile = fileName;
        recordObj[currentContrast.system][currentContrast.fileTag].pastFiles.push(fileName);
        recordObj[currentContrast.system][currentContrast.fileTag].fileDescription = currentContrast.fileDescription;
        if(recordObj[currentContrast.system][currentContrast.fileTag].pastFiles.length>3){
            var fname = recordObj[currentContrast.system][currentContrast.fileTag].pastFiles.shift();
            fs.unlink(path.join(__dirname, '../generate_file/data/'+fname), function(err){
                if(err){
                    console.log('delete data file error.', err);
                }
            });
        }
        fs.writeFileSync(path.join(__dirname, '../generate_file/contrast.json'), JSON.stringify(recordObj));
    }

    fs.writeFile(path.join(writeDir, fileName), JSON.stringify(o), function (err) {
        if (err) {
            logger.error(err);
            callback(err);
            return false;
        }
        callback(true);
    });
}

// readDir(path.join(__dirname, '../api_package'));

module.exports = generateHtml;