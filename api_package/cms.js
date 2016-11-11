var express = require('express');
var router = express.Router();


/**
 * @start
 * @id          cms-110101
 * @requestType GET
 * @tag         userInfo
 * @description the api for get user information by id.
 * @param       userId      {number}  {true}    {null}    {desc:The user's id in database.}
 * @param       infoType    {number}  {false}   {0}       {desc:The query type. 0|all user info, 1|only simple info}
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
}); //@end

module.exports = router;
