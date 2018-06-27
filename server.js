
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



app.get("/api/whoami/", function(req,res){
  let reqheader = req.headers
  let ip = (reqheader['x-forwarderd-for'] || req.socket.remoteAddress)
  let language = reqheader['accept-language']
  let software = reqheader['user-agent']
  
  let ob = {ipaddress: ip, language: language, software: software}
  res.json(ob)
  
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
