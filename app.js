const express = require("express");
const app = express();
const router = express.Router();
const discord = require("./bot");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/static"));

app.get("/", (req, res) =>{
    discord.sendBot("title\ntest", "\`message\`");
    res.render("index");
})

app.listen("8080", () => {
    console.log("running")
});