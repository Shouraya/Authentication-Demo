const express = require("express"),
mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/auth_demo", {
	useNewUrlParser: true,   //these are written to remove deprecations warning
    useUnifiedTopology: true,
    useFindAndModify: false,
	useCreateIndex: true    
});
const app = express();
app.set("view engine", 'ejs');

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