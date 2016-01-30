var express = require('express');

var bookRouter = express.Router();
var router = function (nav) {
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
            res.render('bookListView', {
                title: 'Books',
                nav: nav,
                books: books
            });
        });

    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = req.params.id;
            res.render('bookView', {
                title: 'Book: ' + id,
                nav: nav,
                book: books[id]
            });
        });
    return bookRouter;
};

module.exports = router;