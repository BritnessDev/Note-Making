const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/notes', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;


db.on('error', function(err) { console.log(err.message); });

db.once('open', function() {
  
    console.log("Successfully connected to the database");

});