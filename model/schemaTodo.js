var mongoose = require('mongoose');
// cree le schemat de mon model
var todoSchema = new mongoose.Schema({
    "note":  String,
    "etat": String
  });
//je recupere mon model je lajoute a ma db en lui donnant un nom
var todoModel = mongoose.model('todolist', todoSchema);
//export mon model
module.exports= todoModel;