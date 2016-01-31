var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var bookController = function (bookService, nav) {

    var middleware = function (req, res, next) { // if u want to apply middleware to the entire route
        //        if (!req.user) {
        //            res.redirect('/');
        //        }
        next();
    };

    var getIndex = function (req, res) {
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
    };

    var getById = function (req, res) {
        var id = new ObjectId(req.params.id);
        var url = 'mongodb://localhost/libraryApp';
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');
            collection.findOne({
                _id: id
            }, function (err, results) {
                if (results.bookId) {
                    bookService.getBookById(results.bookId, function (err, book) {
                        results.book = book;
                        res.render('bookView', {
                            title: 'Book',
                            nav: nav,
                            book: results
                        });
                    });
                } else {
                    res.render('bookView', {
                        title: 'Book',
                        nav: nav,
                        book: results
                    });
                }

            });
        });
    };

    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    };
};

module.exports = bookController;