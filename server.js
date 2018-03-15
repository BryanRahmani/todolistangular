var http = require("http");
var express = require("express");
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var _ = require('lodash');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false});

var todoModel = require('./model/schemaTodo');

mongoose.connect('mongodb://localhost/Todolist', function(err) {
  if (err) { throw err; }else{
    console.log("MONGODB connected")

}
});

app.use(bodyParser.urlencoded({ extended: true }));
// Parse le JSON. Ajout pas possible sans cette ligne
app.use(bodyParser.json({ type: 'application/json' }));

app.use("/assets", express.static("client/static"));
app.use("/app", express.static("client/app"));



app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/client/index.html"));
});


app.get('/todo', function (req, res) {
   todoModel.find({}, function (err, comms) {
      if (err) { 
        throw err;
      } else {
        res.json(comms);
      }
      // comms est un tableau de hash
   })
});


//ajouter une note
app.post('/todo', function(req, res) {
    
    var todo1 = new todoModel(req.body);
    todo1.save(function(err, todo) {
      if(err)
      { 
        console.log(err);
      }
      else
      {
        console.log(todo);
        res.send(todo);
      }
      });
});


//editer une note
app.put('/todo/:id', function (req, res) {

  console.log(req.body);

    todoModel.findOneAndUpdate({ "_id": req.body._id }, req.body, function(err, todo) {
      if(err)
      { 
        console.log(err);
      }
      else
      {
        console.log(todo);
        res.send(todo);
      }
      });
});

app.listen(8080);

