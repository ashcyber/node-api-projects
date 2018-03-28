'use strict';

let https = require('https');
let bodyParser = require('body-parser'); 
let express = require('express'); 
let url = require('url'); 
let {MongoClient} = require('mongodb');

let app = express(); 

app.use(bodyParser.json()); 


app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));



// * after searchParams acts like a regex expr for 0 or more 
// ? refers to query so req.query method must be used 
// : refers to params so req.params must be used 


const client_pass = "test"
const client_user = "test"
const client_url = `mongodb://test:test@ds125479.mlab.com:25479/imgsearch`;



app.get('/latest/imagesearch/', (req, res) => {
    MongoClient.connect(client_url, (err, client) => {
        if(err){
            console.log('Unable to connect to MongoDB server'); 
            return; 
        }

        console.log('connected to mongodb server'); 
        let db = client.db('imgsearch'); 

        db.collection('img').find().limit(10).toArray((err, result)  => {
            if(err){
                console.log('Unable to fetch results'); 
            }
            res.send(JSON.stringify(result, undefined, 2));
        }); 
        
        client.close;
    }); 
 

}); 


app.get('/imagesearch/:searchParams*', (req, res) => {
    let { searchParams } = req.params; 
    let { offset } = req.query; 

    MongoClient.connect(client_url, (err, client) => {
        if(err){
            console.log('Unable to connect to MongoDB server'); 
            return; 
        }

        console.log('connected to mongodb server'); 
        let db = client.db('imgsearch'); 

        db.collection('img').insertOne({
            "searchUrl" : req.get('host') + req.url,   
        }, (err, result) => {
            if(err){
                return res.send('Unable to insert data'); 
            }
            console.log('Inserted the data into mongo'); 
        });
        
        client.close;
    }); 

    
    // Replace the subscriptionKey string value with your valid subscription key.
    let subscriptionKey = '';
    // Verify the endpoint URI.  At this writing, only one endpoint is used for Bing
    // search APIs.  In the future, regional endpoints may be available.  If you
    // encounter unexpected authorization errors, double-check this host against
    // the endpoint for your Bing Search instance in your Azure dashboard.
    let host = 'api.cognitive.microsoft.com';
    let path = '/bing/v7.0/images/search';

    let term = searchParams;

    let response_handler = function (response) {
        let body = '';
        response.on('data', function (d) {
            body += d;
        });

        response.on('end', function () {

            body = JSON.parse(body); 
            body = body["value"]; 
            let result = []; 
            for (let i = 0; i < body.length; i++){
                result.push({
                    "name" : body[i]["name"],
                    "image" : body[i]["contentUrl"], 
                    "thumnail" : body[i]["thumbnailUrl"], 
                }); 
            }

            res.send(result);

            // body = JSON.stringify(JSON.parse(body), null, '  ');
            
            // Setting the global resp to body of response_handler
            // res.send(body.key);
        });
        response.on('error', function (e) {
            console.log('Error: ' + e.message);
        });
    };

    let bing_image_search = function (search, off = 10) {
    console.log('Searching images for: ' + term);
    let request_params = {
            method : 'GET',
            hostname : host,
            path : path + '?q=' + encodeURIComponent(search) + `&count=${encodeURIComponent(off)}`,
            headers : {
                'Ocp-Apim-Subscription-Key' : subscriptionKey,
            }
        };

        let req = https.request(request_params, response_handler);
        req.end();
    }


    if (subscriptionKey.length === 32) {
        // Search image based on term 
        bing_image_search(term, offset);
    } else {
        console.log('Invalid Bing Search API subscription key!');
        console.log('Please paste yours into the source code.');
    }

}); 


// Listening to PORT 3000 
app.listen(3000, () => {
    console.log('Listening to port 3000'); 
}); 