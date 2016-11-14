var express = require('express');
var router = express.Router();
var doc = require('../api_generateDoc/doc');


/* GET home page. */
router.get('/getApiList/:apiSys', function (req, res, next) {
    var reqBody = req.query;
    doc.create('api_package/cms.js', '/api/cms', function (data) {
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
