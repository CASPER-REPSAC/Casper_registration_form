const express = require("express");
const router = express.Router();
const sessionCheck = require("../feature/sessionCheck");
const config = require("../config/token.json");

router.post("/token_check", (req, res) => {
    console.log(req.body.token);
    if (req.body.token == config.casper_check_token) {
        req.session.token_check_ok = "true";
        res.redirect('/form');
    }

    res.send("<script>alert('틀림'); location.href='/'; </script>");
});

module.exports = router;