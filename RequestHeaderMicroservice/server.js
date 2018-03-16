 
'use strict';

var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));



// Fetching the input string
app.get(('/api/whoami'), function(req, res){  
  // GET user IP
  var user_ip = req.headers['x-forwarded-for'].split(',')[0];
  
  // GET user Language
  var lang = req.headers['accept-language'].split(',')[0]; 
  
  //GET Software
  var re = new RegExp(/\(([\w\s.;,]*)\)/);
  var user_agents = re.exec(req.headers['user-agent']); 
  var software = user_agents[1];
  
  //SEND info 
  res.send(JSON.stringify({
    'ipaddress': user_ip, 
    'language' : lang, 
    'software' : software
  }));   
}); 


app.listen(3000, () => {
  console.log('Listening on port 3000');
});










