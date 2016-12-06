let fs = require('fs');
let path = require('path');

let achieve_sys = {
    getContrastTable: function(cb){
        fs.readFile(path.join(__dirname, '../generate_file/contrast.json'), function(err, content){
            if(err){
                cb(false);
                return false;
            }
            cb(JSON.parse(content.toString()));
        });
    },
    getFileDoc: function(fileName, cb){
        fs.readFile(path.join(__dirname, '../generate_file/data/'+fileName), function(err, content){
            if(err){
                cb(false);
                return false;
            }
            cb(JSON.parse(content.toString()));
        });
    }
};

module.exports = achieve_sys;