var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');

passport.use(new LocalStrategy(
    function(username, password, done) {

      User.findOne({ email: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        user.comparePassword(password,function(err,status){
          console.log("comparing pw: ",password)
          return status ? done(null, user) : done(null, false, { message: 'Incorrect password.' });
        }) 
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

module.exports = passport;
