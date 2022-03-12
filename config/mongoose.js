const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;


db.on('error', function(err) { console.log(err.message); });

db.once('open', function() {
  
    console.log("Successfully connected to the database");

});