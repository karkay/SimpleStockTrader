require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const authRoutes = require('./backend/routes/authRoutes')
const api = require(path.join(__dirname,'/backend/routes'));
const PATH_DIR = process.env.NODE_ENV === 'production' ? 'build' : 'public';
const isDevMode = process.env.NODE_ENV === 'production' ? false : true;
const port = process.env.PORT || 5000;
var {db, User} = require('./backend/models/dbConfig')
const passport = require('passport');



const app = express();

app.use(express.json());



app.use(cookieSession({
	maxAge:30*24*60*60*1000,
	keys:[process.env.COOKIE_SECRET]
}))

app.use(passport.initialize());
app.use(passport.session());

const notAuth = new Error("You are not logged in.");
		notAuth.statusCode = 401;

const checkAuth = (req,res,next) =>{
	if(req.user){
		console.log("passed auth:",req.user)
		next();
	}
	else {
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		console.log(`[AUTH]: UNAUTHORIZED REQUEST FROM [${ip}]`)
		next(notAuth);
	}
}



app.use('/auth',authRoutes);
app.use('/api',checkAuth,api);
console.log("HAHA: ",path.join(__dirname, PATH_DIR));
app.use(express.static(path.join(__dirname, PATH_DIR)));
app.get('*', (req, res) => {
    console.log(path.join(__dirname, PATH_DIR,'index.html'));
	res.sendFile(path.join(__dirname, PATH_DIR,'index.html'))
  })


app.listen(port,()=>{
	console.log("[BACKEND]: Listening on port ", port, "...");
})