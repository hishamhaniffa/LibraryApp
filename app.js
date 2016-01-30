/* jshint node: true */

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('views', './src/views');

// for handelbars
//var handlebars = require('express-handlebars');
//app.engine('.hbs', handlebars({extname: '.hbs'}));

var nav = [{
    Link: '/Books',
    Text: 'Books'
        }, {
    Link: '/Authors',
    Text: 'Authors'
        }]

var bookRouter = require('./src/routes/bookRoutes')(nav);

app.set('view engine', 'ejs'); // for jade and ejs only change the view engine

app.use('/Books', bookRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: nav
    });
});

app.listen(port, function (err) {
    console.log('Running server on port: ' + port);
});