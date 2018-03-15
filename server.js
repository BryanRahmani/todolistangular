var http = require("http");
var express = require("express");

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

var path = require('path');
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

// Sert les fichiers (CSS, HTML, JS)
app.use("/assets", express.static("client/static"));

// Ont sert les controller,service,template (Angular JS)
app.use("/app", express.static("client/app"));



//Route qui gère la page index
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/client/index.html"));
});


// Route API qui affiche notre liste de tâche
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


// Route API qui crée une nouvelle tâche
app.post('/todo', function(req, res) {
    
    var todo1 = new todoModel(req.body);
    todo1.save(function(err, todo) {
      if(err)
      { 
        console.log(err);
      }
      else
      {
        //console.log(todo);
        io.emit('newTodo', todo);
        res.send(todo);
      }
      });
});


// Route API qui supprime une tâche
app.delete('/todo/:id', function (req, res) {

  console.log(req.body);

    todoModel.remove({ "_id": req.params.id }, function(err, todo) {
    }).then(function(succ) {
      //console.log(succ);
      io.emit('deleteTodo', { '_id' : req.params.id});
      res.send(req.body);
    }, function(err) {
      res.send(err);
    });
});


//Route API qui change l'état d'une tâche
app.put('/todo/:id', function (req, res) {

  console.log(req.body);

    todoModel.findOneAndUpdate({ "_id": req.body._id }, req.body, function(err, todo) {
    }).then(function(succ) {
      //console.log(succ);
      io.emit('updateTodo', req.body);
      res.send(req.body);
    }, function(err) {
      res.send(err);
    });
});

http.listen(8080);

