const Router = require('express').Router();
let User = require('../../models/userModel');

Router.get('*',(req,res,next)=>{
    console.log("correct routing")
    User.findOne({email: req.user.email},function(err,user){
        console.log("get trans",err,user);
        if(err) next(err);
        if(!user) return res.send([]);
        return res.send(user.transactions);
    })
})
Router.post('*',(req,res,next)=>{
    User.findOne({email:req.user.email},function(err,user){
        console.log("post trans",err,user);
        if(err) next(err);
        if(!user) return res.send({success:false,message:"user dne"});
        const orderCost = req.body.costPerShare * req.body.numShares;
        if(user.balance < orderCost){
            return res.send({success:false,message:"insufficient balance"})
        }
        let newTransList = [...user.transactions];
        newTransList.push(req.body);
        let newBal = user.balance - orderCost;
        console.log("trans nearly successful", user);
        user.updateOne({transactions: newTransList, balance: newBal})
        .then((a)=>{
            console.log("transaction successful.");
            return res.send({success:true});
        })
        .catch((e)=>{
            next(err);
        })
        

    })
})

module.exports = Router;