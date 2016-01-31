var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var router = function (nav) {

    bookRouter.route('/')
        .get(function (req, res) {
            var url = 'mongodb://localhost/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.find().toArray(function (err, results) {
                    res.render('bookListView', {
                        title: 'Books',
                        nav: nav,
                        books: results
                    });
                });
            });
        });

    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = new ObjectId(req.params.id);
            var url = 'mongodb://localhost/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.findOne({
                    _id: id
                }, function (err, results) {
                    res.render('bookView', {
                        title: 'Book',
                        nav: nav,
                        book: results
                    });
                });
            });
        });
    return bookRouter;
};

module.exports = router;