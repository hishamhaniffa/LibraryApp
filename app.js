/* jshint node: true */

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('views', './src/views');

// for handelbars
//var handlebars = require('express-handlebars');
//app.engine('.hbs', handlebars({extname: '.hbs'}));

var bookRouter = express.Router();

app.set('view engine', 'ejs'); // for jade and ejs only change the view engine

var books = [
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Niklos',
        read: false
    },
    {
        title: 'Oliver Twist',
        genre: 'Historical Fiction',
        author: 'Charles Willim',
        read: true
    }
];

bookRouter.route('/')
    .get(function (req, res) {
        res.render('books', {
            title: 'Hello from render',
            nav: [{
                Link: '/Books',
                Text: 'Books'
        }, {
                Link: '/Authors',
                Text: 'Authors'
        }],
            books: books
        });
    });

bookRouter.route('/single')
    .get(function (req, res) {
        res.send('Hello Single Book');
    });

app.use('/Books', bookRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: [{
            Link: '/Books',
            Text: 'Books'
        }, {
            Link: '/Authors',
            Text: 'Authors'
        }]
    });
});


app.listen(port, function (err) {
    console.log('Running server on port: ' + port);
});