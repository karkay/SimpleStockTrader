const router = require('express').Router();
const passport = require('../auth/passport-setup');
const User = require('../models/userModel');


router.post('/login',
  passport.authenticate('local'),
  function(req,res){
    console.log("req.user: ",req.user);
    return res.send({auth:true})
  }
);
router.post('/register',(req,res)=>{
  const status = {regSuccess: false};
  console.log(!req.body.username, !req.body.password)
  if(req.body.username === undefined || req.body.password === undefined) return res.send(status);
    User.findOne({email:req.body.username}, function(err,user){
      if(err) return res.send(status);
      if(!user){
        //no user exists, so register
        let newUser = new User({
          email:req.body.username,
          password: req.body.username,
          transactions: [],
          balance: 5000
        });
        newUser.save(function(err,usr){
          if(err) return res.send(status);
          status.regSuccess = true;
          return res.send(status)
        })
      }else{
        return res.send(status);
      }
      
    })
})

module.exports = router;