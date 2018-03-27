let express = require('express'); 
let bodyParser = require('body-parser'); 

// Using a multi-part file module 
// As defined by multer Readme.md 
var multer  = require('multer'); 

// Creates a temporary folder to store the file 
var upload = multer({ dest: 'uploads/' }); 


let app = express(); 

app.use(bodyParser.json());
app.use(express.static(__dirname + '/views'));

app.post('/upload', upload.single('file'), function (req, res, next) {
    res.send(JSON.stringify(req.file));
    // res.body -> stores the text of the file 

  })

// Listening to port 3000 
app.listen(3000, () => {
    console.log("listening to port 3000"); 
}); 

