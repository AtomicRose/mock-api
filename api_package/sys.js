var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var fileBlock = require('../api_generateDoc/fileBlock');
var generateHtml = require('../api_generateDoc/generateHtml');



router.get('/generateDocHtml', function (req, res, next) {
    var reqBody = req.query;
    generateHtml.create(path.join(__dirname, '../api_package'), function (value) {
        if(value === true){
            res.json({
                status: 'ok',
                errorCode: '000000',
                errorMsg: 'success',
                results: ''
            });
        }else{
            res.json({
                status: 'error',
                errorCode: '-9999',
                errorMsg: value,
                results: ''
            });
        }

    });
});

router.get('/getContrast', function(req, res, next){
    fs.readFile(path.join())
});

module.exports = router;
