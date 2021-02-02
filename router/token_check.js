const express = require("express");
const router = express.Router();
const sessionCheck = require("../feature/sessionCheck");
const config = require("../config/token.json");

router.get("/token_check", (req, res) => {
    if (req.body.token == config.casper_check_token) {
        req.session.token_check_ok = "true";
        res.redirect('/form');
    }
});

module.exports = router;