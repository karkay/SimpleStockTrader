  
const mongoose = require('mongoose');
const {User} = require('./userModel');
const username = process.env.DB_USER;
const password = process.env.DB_PW;
const dbInfo = process.env.DB_INFO;
const dbURI = `mongodb+srv://${username}:${password}@${dbInfo}`;
test = require('assert');
const options = {
    useNewUrlParser: true,

  };
var conn = mongoose.connection;
mongoose.connect(dbURI,options);

conn.on('error',()=>{
  console.error.bind(console, 'connection error:')
})
conn.once('open',()=>{
  console.log("Connected to Mongo DB! ");
  conn.db.listCollections().toArray().then(function(items){
    console.log("Collection Context: ",items[0].name);
    test.ok(items.length >= 1);
  })
})
conn.on('connecting', function() {
  console.log('[MONGODB]: Establishing connection..');

});






module.exports = {conn, User}