// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var path = require('path');
var cors = require('cors');
var fs = require('fs');
var timeout = require('connect-timeout');


app.use(cors());
app.use(timeout(5000000));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get("/services/notification",function(req,res){
    res.sendFile(path.normalize(__dirname +"/data/notification.json"));
});
app.post("/services/notification",function(req,res){
    //var searchQuery = req.body.searchQuery;
    res.sendFile(path.normalize(__dirname +"/data/notification.json"));
});


// listen (start app with node server.js) ======================================
app.listen(8050);
console.log("App listening on port 8040");