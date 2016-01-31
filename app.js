/* jshint node: true */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var coookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('views', './src/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(coookieParser());
app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true
}));
require('./src/config/passport')(app);

var nav = [{
    Link: '/Books',
    Text: 'Books'
}, {
    Link: '/Authors',
    Text: 'Authors'
}];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.set('view engine', 'ejs'); // for jade and ejs only change the view engine

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: nav
    });
});

app.listen(port, function (err) {
    console.log('Running server on port: ' + port);
});