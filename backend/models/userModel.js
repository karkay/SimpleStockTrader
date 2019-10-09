const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const salt_rounds = 10;
const bcrypt = require('bcrypt');

let userSchema = new Schema({
   email:String,
   password: String,
   transactions: Array,
   balance: Number 

},
{collection: 'users'});

userSchema.pre('save', function(next){
   let user = this;
   bcrypt.genSalt(salt_rounds,function(err,salt){
      if(err) next(err);
      //hash the pw
      console.log("plaintext pw:",user.password)
      bcrypt.hash(user.password,salt,function(err,hash){
         if(err) next(err);
         user.password = hash;
         console.log("hashed pw:",user.password)
         next();
      });
   });
})
userSchema.methods.comparePassword = function(candidatePass, callback){
   bcrypt.compare(candidatePass,this.password,function(err,isMatch){
      if(err) return callback(err);
      callback(null,isMatch);
   });
};

const User = mongoose.model('user',userSchema);

module.exports = User;