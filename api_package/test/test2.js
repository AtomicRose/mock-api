/**
 * @system              Mock测试
 * @fileTag             test2
 * @baseUri             /api/test
 * @fileDescription     The cms api file.
 * @author              Atomer
 */
var express = require('express');
var router = express.Router();


/**
 * @id          test2-001
 * @method      get user infomation.
 * @requestType GET
 * @uri         /userInfo
 * @description the api for get user information by id.
 * @param       {key: userId}      {type: number}  {required: true}    {default: null}    {desc: The user's id in database.}
 * @param       {key: infoType}    {type: number}  {required: false}   {default: 0}       {desc: The query type. 0|all user info, 1|only simple info}
 * @extra
 * @editor      Atomer  2016-11-15 22:03:44
 * @type {[type]}
 */
router.get('/userInfo', function (req, res, next) {
    var reqQuery = req.query;
    res.json({
        status: 'ok',
        errorCode: '000000',
        errorMsg: 'success',
        results: {
            name: 'Jack',
            age: 14,
            desc: 'Hello. My name is Jack, from UK.'
        }
    });
});

router.post('/userInfo/:id', function(req, res, next){
    var reqBody = req.body;
    console.log(req.body.name);
    res.json({
        status: 'ok',
        errorCode: '000000',
        errorMsg: 'success',
        results: {
            text: 'You send the body & param',
            body: reqBody,
            id: req.params.id
        }
    });
});

/**
 * @id          test2-002
 * @method      get user name
 * @requestType GET
 * @uri         /getUserName
 * @description the api for get user information by id.
 * @param       {key: userId}      {type: number}  {required: true}    {default: null}    {desc: The user's id in database.}
 * @param       {key: infoType}    {type: number}  {required: false}   {default: 0}       {desc: The query type. 0|all user info, 1|only simple info}
 * @extra
 * @type {[type]}
 */
router.get('/getUserName', function (req, res, next) {
    var reqBody = req.query;
    res.json({
        status: 'ok',
        errorCode: '000000',
        errorMsg: 'success',
        results: {
            name: 'Jack',
            age: 14,
            desc: 'Hello. My name is Jack, from UK.'
        }
    });
});

module.exports = router;
