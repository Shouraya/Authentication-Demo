require('dotenv').config();
const express = require("express"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      bodyParser = require("body-parser"),
      User = require("./models/user"),
      LocalStrategy = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/auth_demo", {
	useNewUrlParser: true,   //these are written to remove deprecations warning
    useUnifiedTopology: true,
    useFindAndModify: false,
	useCreateIndex: true    
});

const app = express();
app.set("view engine", 'ejs');
app.use(require("express-session")({
    secret : process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

//Setting Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res){
    res.render('home');
});

app.get("/secret", function(req,res){
    res.render("secret");
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log("Server has started !");
});