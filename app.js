var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// the page routes require
var routes = require('./routes/index');
var users = require('./routes/users');
var api_cms = require('./api_package/cms');

var app = express();

// //register the view engine
// var fs = require('fs');
// app.engine('html', function(filePath, options, callback){
//     fs.readFile(filePath, function(err, content){
//         if(err){
//             return callback(new Error(err));
//         }else{
//             var htmlStr = content.toString();
//             //replace the init page params.
//             for(key in options.ntlData){
//                 eval('var reg = \/\<\%\=\\s\*'+key.toString()+'\\s\*\>\/g');
//                 htmlStr = htmlStr.replace(reg, options.ntlData[key]);
//             }
//             //then, replace the extended page & the include block;
//             var extendMatchArray = content.match(/\@extend\s[a-z,A-Z,0-9]*/);
//             for(var i=0,len=extendMatchArray.length;i<len; i++){
//                 var temp = extendMatchArray[i];
//                 extendMatchArray[i]= temp.split('@extend ')[1];
//             }
//             return callback(null, htmlStr);
//         }
//     });
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// the page route use
app.use('/', routes);
app.use('/users', users);

// the api route use
app.use('/api/cms', api_cms);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
