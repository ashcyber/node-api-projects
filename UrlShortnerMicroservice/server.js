'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));


// pass and user should be given as env variables
// however for this project it is given here for simplicity
const client_pass = "test"
const client_user = "test"
const client_url = `mongodb://<dbuser>:<dbpass>@ds123499.mlab.com:23499/urlshort`;

// The limitation of this code is
// num_url is random over a large space
// but not unique

// GET /new/https://google.com
app.get('/new/:url(*)', (req, res) => {
  // addUrl(req.params.url);
  var url = req.params.url;
  const expr = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  var re = new RegExp(expr);

  if(url.match(re)){
    // Adding valid url to MONGO and
    MongoClient.connect(client_url, (err,client) => {
        if(err){
          console.log('Unable to connect to MongoDB server');
          return;
        }
        console.log('connected to mongodb server');
        var db = client.db('urlshort');

        var num = Math.floor(Math.random() * 1000000);

        db.collection('urls').insertOne({
          original_Url: url,
          num_url: num
        }, (err,result) => {
          if(err){
            return res.send('Unable to insert data');
          }
          res.send({
            "original_url" : url,
            "short_url" : 'http://' + req.headers.host + `/${num}`
          });
        });
        client.close();
    });
  }
  else{
    return res.send('Invalid parameter: make sure the url is in http/https format.');

  }
});


//GET /4324234
app.get('/:urlNum', (req, res) => {
  var num = parseInt(req.params.urlNum);
  MongoClient.connect(client_url, (err, client) => {

    if(err){
      return console.log(err);
    }
    var db = client.db('urlshort');

    db.collection('urls').findOne({"num_url" : num}, (err, result) => {
      if(err){
        return console.log(err);
      }
      if(result !== null){
        return res.redirect(result.original_Url);
      }else{
        return res.send('No url in database');
      }
    });
  });
});


app.listen(3000, () => {
  console.log('Listening on port 3000');
});
