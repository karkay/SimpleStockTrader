const Router = require('express').Router();
const user = require('./user/index');
const transactions = require('./transactions/index');
Router.use('/user', user);
Router.use('/transactions',transactions);
Router.use('*',(req,res)=>{
	res.status(200).send("Invalid API Call :X");
})
module.exports = Router;