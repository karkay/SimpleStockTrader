require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const authRoutes = require('./routes/authRoutes')
const api = require(path.join(__dirname,'/routes'));
const PATH_DIR = process.env.NODE_ENV === 'production' ? 'client/build' : 'public';
const isDevMode = process.env.NODE_ENV === 'production' ? false : true;
const port = process.env.PORT || 8080;
var {db, User} = require('./models/dbConfig')
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

app.use(express.static(path.join(__dirname, `${PATH_DIR}`)));
// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname + `../${PATH_DIR}/index.html`))
//   })


app.listen(port,()=>{
	console.log("[BACKEND]: Listening on port ", port, "...");
})