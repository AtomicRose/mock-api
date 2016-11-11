var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Home'
    });
});
/* GET doc page*/
router.get('/doc', function (req, res, next) {
    res.render('doc', {
        title: 'doc,',
        name: 'Jack'
    });
});
/**
 * GET api
 * @type {String}
 */
router.get('/doc/:productId', function (req, res, next) {
    res.render('api', {
        title: 'api-' + req.params.productId
    });
});

module.exports = router;
