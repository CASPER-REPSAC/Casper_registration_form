const express = require("express");
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require("mongoose"); 

/*=====Route Modules=====*/
const router_token_check = require("./router/token_check");
const router_form = require("./router/form");
const router_submit = require("./router/submit");

/*=====MongoDB Connect=====*/
let url = "mongodb://127.0.0.1:27017/casperbot";
mongoose.connect(url, {useNewUrlParser: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

app.use(express.json()); //json request
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/static"));

app.get("/", (req, res) =>{
    res.render("check");
})

app.post('/token_check', router_token_check);
app.get("/form", router_form);
app.post('/submit',router_submit);

app.listen("8000", () => {
    console.log("running")
});
