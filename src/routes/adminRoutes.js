var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
    {
        title: 'Doing Data Science',
        genre: 'Historical Fiction',
        author: 'Lev Niklos',
        bookId: 17346997,
        read: false
    },
    {
        title: 'Oliver Twist',
        genre: 'Historical Fiction',
        author: 'Charles Dickens',
        bookId: 18254,
        read: true
    },
    {
        title: 'Great Expectation',
        genre: 'Historical Fiction',
        author: 'Charles Dickens',
        bookId: 2623,
        read: false
    }
];

var router = function (nav) {

    adminRouter.route('/addBooks')
        .get(function (req, res) {
            var url = 'mongodb://localhost/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.insertMany(books, function (err, results) {
                    res.send(results);
                    db.close();
                });
            });
            //            res.send('inserting books');
        });

    return adminRouter;
};

module.exports = router;