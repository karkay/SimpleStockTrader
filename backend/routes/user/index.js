const Router = require('express').Router();
let User = require('../../models/userModel');

Router.get('/balance',(req,res,next)=>{
    User.findOne({email: req.user.email},function(err,user){
        console.log("get balance",err,user);
        if(err) next(err);
        if(!user) res.send({balance: 0});
        res.send({balance: user.balance});
    })
})
Router.post('/user',(req,res,next)=>{
    res.send({...req.body,"ok":"creating/registering user."})
})

module.exports = Router;