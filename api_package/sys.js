var express = require('express');
var router = express.Router();
var fileBlock = require('../api_generateDoc/fileBlock');


/* GET home page. */
router.get('/getApiList/:apiSys', function (req, res, next) {
    var reqBody = req.query;
    fileBlock.get('api_package/cms.js', function (data) {
        res.json({
            status: 'ok',
            errorCode: '000000',
            errorMsg: 'success',
            results: {
                list: data
            }
        });
    });

});

module.exports = router;
