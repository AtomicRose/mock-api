var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/getApiList/:apiSys', function (req, res, next) {
    var reqBody = req.query;
    res.json({
        status: 'ok',
        errorCode: '000000',
        errorMsg: 'success',
        results: {
            list: [1, 2, 3, 4]
        }
    });
});

module.exports = router;
