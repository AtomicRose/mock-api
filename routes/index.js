var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Home'
    });
});
/* GET doc page*/
router.get('/document', function (req, res, next) {
    res.render('doc', {
        title: 'doc'
    });
});
/**
 * GET api
 * @type {String}
 */
router.get('/document/api', function (req, res, next) {
    res.render('api', {
        title: 'api-doc'
    });
});

module.exports = router;
