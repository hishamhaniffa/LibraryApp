var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

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
        },
        {
            title: 'Great Expectation',
            genre: 'Historical Fiction',
            author: 'Charles Hendri',
            read: true
        }
];

var router = function (nav) {

    adminRouter.route('/addBooks')
        .get(function (req, res) {
            var url = 'mongodb://localhost/libraryApp';
            mongodb.connect(url, function(err, db){
                var collection = db.collection('books');
                collection.insertMany(books, function(err, results){
                    res.send(results);
                    db.close();
                });
            });
//            res.send('inserting books');
        });

    return adminRouter;
};

module.exports = router;