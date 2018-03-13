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



app.get ('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/client/index.html"));
});


app.get('/todo', function (req, res) {
   todoModel.find({}, function (err, comms) {
      if (err) { 
        throw err;
      }
      // comms est un tableau de hash
     res.json(comms);
   }).then(function(res2) {
      console.log(res2);
   });
});


//ajouter une note
app.post('/todo', function(req, res) {
    
    var todo1 = new todoModel(req.body);
    todo1.save().then(function(req, res) {
      res.send(res);
      });
});


//Supprimer une note
app.delete('/todo/:id', function(req, res) {

 todo.remove({ _id: req.params.id }, function(err, todo) {
    
    if(err){
      res.send(err);
    }

  })
 .then(function(todo) {

       res.send(req.body);
  });
});

//editer une note
app.put('/todo/:id', function (req, res) {
  todoModel.findOne({"_id" : req.params.id}, '-__v -Rank', function(err,docs) {
      if(err) {
        res.json("'error':'l\'id est inexistant'");
      } else {
        return res.json(docs);
      }
  });
})

app.listen(8080);

