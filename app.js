var express = require('express');
var app = express();
var port = 3000;

app.get('/', function(req, res){
   res.send('Hello World!'); 
});

app.get('/books', function(req, res){
   res.send('Hello Books'); 
});

app.listen(port, function(err){
    console.log('Running server on port: ' + port);
});