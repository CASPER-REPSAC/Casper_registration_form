const express = require("express");
const app = express();
const session = require('express-session');

const router_token_check = require("./router/token_check");
const router_form = require("./router/form");
const router_submit = require("./router/submit");

app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));
app.use(express.json()); //json request
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/static"));

app.get("/", (req, res) =>{
    res.render("index");
})

app.post('/token_check', router_token_check);
app.get("/form", router_form);
app.post('/submit',router_submit);

app.listen("8080", () => {
    console.log("running")
});
