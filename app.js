const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express');
const router = express.Router();
const loginRouter = require('./routes/login');
const session = require('express-session')

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static(path.join(__dirname, 'static')))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(giveSessionID)
app.use("/login", loginRouter);


app.get("/", function(req, res, next){
  res.render("index", {appType:"Express"})
})

app.listen(3000, function(){
  console.log("App running on port 3000")
})

function giveSessionID(req,res,next){
  let sess = req.session
  if(sess){
    if(sess.loggedIn){
    console.log(sess.loggedIn)
    next()
    }else {
      console.log("No login data")
      next()
    }
  } else {
    console.log("No session data")
    next()
  }
}