// getting-started.js
var mongoose = require('mongoose');
var post = require('./send.js');
var selfKeys = require('./selfKeys.json');
mongoose.connect('mongodb://localhost/faksDB');
var express = require('express')
var app = express()
const port = 1998
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("DB connected")});

app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/private', function (req, res) {
  //get all private data with gt than x
  var id = req.query.id; 
  MyModel.find({ id: { $gt: id }}, function (err, docs) {
    if(err){
      console.log("err finding record: "+err);
      res.send(false);
    }
    else{
      res.send(docs);
    }
  });
})

app.get('/public', function (req, res) {
  //Use noha's function 
  
})

app.get('/new', function (req, res) {
  //Use noha's function 
  
})


app.get('/launchData', function (req, res) {
  var record = {
    //req.query.fA||
    address: selfKeys.address,
    to: selfKeys.to,
    gasPrice: 1,
    value:0,
    //req.query.fP||
    secretKey: selfKeys.secretKey,
    data: JSON.stringify({
      "date":req.query.date,
      "launchWindow":req.query.launchWindow,
      "description":req.query.description,
      "missoin":req.query.missoin,
          })
      }
  console.log(record.data)
  post(record)
  
})


app.post('/add', function (req, res) {
  //Use noha's function 
  var obj = JSON.parse(req.body);
  if (obj.state=="private"){
    var newData = {
      sensor: obj.sensor,
      value: obj.value,
      name: "test",
      from: selfKeys.address,
      id: obj.id,
      to: selfKeys.to,
      state: obj.state
    }
    
    
    var record = new tx({
      address: selfKeys.address,
      to: selfKeys.to,
      gasPrice: 1,
      secretKey: selfKeys.secret,
      id: obj.id,
      data: newData.toString()
    })

  }
  else {
    var record = {
      address: selfKeys.address,
      to: selfKeys.to,
      gasPrice: 1,
      secretKey: selfKeys.secret,
      data: newData.toString()
    }
    console.log(record)
    post(record)
  }
  
})


app.listen(port, () => console.log(`Faks app listening on port ${port}!`))