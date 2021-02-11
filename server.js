// server.js
// where your node app starts

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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

let unix
let utc
app.get('/api/timestamp/:date', (req, res) => {
  let inp = req.params.date

  if(inp.includes('-') || inp.includes(' ')) {
    unix = new Date(inp).getTime()
    utc = new Date(inp).toUTCString()
  } else {
    unix = new Date(parseInt(inp)).getTime()
    utc = new Date(parseInt(inp)).toUTCString()
  }
  if(!unix || !utc) {
    res.send({error: 'Invalid Date'})
  }
  res.send({'unix': unix, 'utc': utc})
})

app.get('/api/timestamp', (req, res) => {
  unix = new Date().getTime()
  utc = new Date().toUTCString()
  res.send({'unix': unix, 'utc': utc})
})