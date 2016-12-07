/**
 * @system              sys
 * @fileTag             mock
 * @baseUri             /api/sys
 * @fileDescription     mock-api系统相关接口文档
 * @author              Atomer
 */

var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var fileBlock = require('../generateMethod/fileBlock');
var generateHtml = require('../generateMethod/generateHtml');
var achieve_sys = require('../api_achieve/achieve_sys');


/**
 * @id          sys-001
 * @method      生成接口文档
 * @requestType GET
 * @uri         /generateDocHtml
 * @description 通过query方式传入api_package/路径下的子路径来生成对应的接口文档。
 * @param       {key: subDir}      {type: string}  {required: false}    {default: null}    {desc: api_package下的子路径，以"/"开头，例如:/subdir}
 * @param       {key: subDir}      {type: string}  {required: false}    {default: null}    {desc: api_package下的子路径，以"/"开头，例如:/subdir}
 * @extra
 * @editor      Atomer  2016-11-16 09:56:33
 * @type {[type]}
 */

router.get('/generateDocHtml', function (req, res, next) {
    var query = req.query;
    var subDir = '';
    if (query.subDir && query.subDir != '') {
        subDir = query.subDir;
    }
    generateHtml.create(path.join(__dirname, '../api_package' + subDir), function (value) {
        if (value === true) {
            res.json({
                status: 'ok',
                errorCode: '000000',
                errorMsg: 'success',
                results: ''
            });
        } else {
            res.json({
                status: 'error',
                errorCode: '-9999',
                errorMsg: value,
                results: ''
            });
        }

    });
});
/**
 * @id          sys-002
 * @method      获取文档对照数据表
 * @requestType GET
 * @uri         /contrastTable
 * @description 获取各系统的mock-api 文件对照表
 * @extra
 * @editor      Atomer  2016-12-6 16:26:38
 * @type {[type]}
 */
router.get('/contrastTable', function (req, res, next) {
    achieve_sys.getContrastTable(function (value) {
        if (value) {
            res.json({
                status: 'ok',
                errorCode: '000000',
                errorMsg: 'ok',
                results: value
            });
        } else {
            res.json({
                status: 'error',
                errorCode: '-9999',
                errorMsg: 'read the contrast.json error.',
                results: ''
            });
        }
    })
});

router.get('/fileDoc/:fileName', function (req, res, next) {
    var fileName = req.params.fileName;
    achieve_sys.getFileDoc(fileName, function (value) {
        if (value) {
            res.json({
                status: 'ok',
                errorCode: '000000',
                errorMsg: 'ok',
                results: value
            });
        } else {
            res.json({
                status: 'error',
                errorCode: '-9999',
                errorMsg: 'read this file:' + fileName + ' error.',
                results: ''
            });
        }
    })
});



module.exports = router;
