// index.js
// where your node app starts
require('dotenv').config();
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api", function (req, res) {
  res.json({unix: new Date().getTime(), utc: new Date().toUTCString()});
});

app.get("/api/:date", function (req, res) {
  const regex = /^\d{13}$/
  if(regex.test(req.params.date)){
    res.json({unix: parseInt(req.params.date), utc: new Date(parseInt(req.params.date)).toUTCString()})
  }
  let parsedDate = Date.parse(req.params.date)
  if(parsedDate){
    res.json({unix: parsedDate, utc: new Date(parsedDate).toUTCString()});
  } else {
    res.json({error: "Invalid Date"});
  }

});
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
