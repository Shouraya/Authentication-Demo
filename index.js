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
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret : process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

//Setting Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//++++++++++++++
//ROUTES
//++++++++++++++
app.get("/", function(req, res){
    res.render('home');
});

app.get("/secret", function(req,res){
    res.render("secret");
});

//+++++++++++++++++++
//AUTH ROUTES
//+++++++++++++++++++

//Show Sign Up Form
app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.render('register');
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secret");
            });
        }
    });
});

//+++++++++++
//LOGIN
//+++++++++++
app.get("/login", function(req, res){
    res.render('login');
});

app.post("/login", passport.authenticate("local",{
    successRedirect: "/secret",
    failureRedirect: "/login"
}) ,function(req, res){
    //leave empty for now
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log("Server has started !");
});