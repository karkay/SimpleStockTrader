const router = require('express').Router();
const passport = require('../auth/passport-setup');
const User = require('../models/userModel');


router.post('/login',
  passport.authenticate('local'),
  function(req,res){
    console.log("req.user: ",req.user);
    res.send({auth:true})
  }
);
router.post('/register',(req,res)=>{
  const status = {regSuccess: false};
  console.log(!req.body.username, !req.body.password)
  if(req.body.username === undefined || req.body.password === undefined) res.send(status);
    User.findOne({email:req.body.username}, function(err,user){
      if(err) res.send(status);
      if(!user){
        //no user exists, so register
        let newUser = new User({
          email:req.body.username,
          password: req.body.username,
          transactions: [],
          balance: 5000
        });
        newUser.save(function(err,usr){
          if(err) res.send(status);
          status.regSuccess = true;
          res.send(status)
        })
      }else{
        res.send(status);
      }
      
    })
})

module.exports = router;