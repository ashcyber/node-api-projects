 
'use strict';

var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const month_name = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));



// Fetching the input string
app.get(('/:values'), function(req, res){
  var values = req.params.values;
  var d = new Date();
  var reg = /^\d+$/;
  
  
  if(reg.test(values)){
     // Value is unixtimestamp
    d.setTime(parseInt(values*1000));
  }else{
     // Value is a date 
    d = new Date(values);
  }
  
  
  
  if(d.getTime()){
    res.send(JSON.stringify({
      unix: d.getTime()/1000, 
      natural: month_name[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear()
    })); 
  }
  
  else{
    res.send(JSON.stringify({unix: null, natural: null}));
  }
  

}); 


app.listen(3000, () => {
  console.log('Listening on port 3000');
});










