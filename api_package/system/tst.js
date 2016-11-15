var express = require('express');
var router = express.Router();


/**
 * @id          cms-110101
 * @requestType GET
 * @tag         userInfo
 * @uri         /cms/userInfo
 * @description the api for get user information by id.
 * @param       {key: userId}      {type: number}  {required: true}    {default: null}    {desc: The user's id in database.}
 * @param       {key: infoType}    {type: number}  {required: false}   {default: 0}       {desc: The query type. 0|all user info, 1|only simple info}
 * @extra
 * @type {[type]}
 */
router.get('/userInfo', function (req, res, next) {
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

/**
 * @id          cms-22222
 * @requestType GET
 * @tag         userName
 * @uri         /cms/userInfo
 * @description the api for get user information by id.
 * @param       {key: userId}      {type: number}  {required: true}    {default: null}    {desc: The user's id in database.}
 * @param       {key: infoType}    {type: number}  {required: false}   {default: 0}       {desc: The query type. 0|all user info, 1|only simple info}
 * @extra
 * @type {[type]}
 */
router.get('/userInfo', function (req, res, next) {
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
