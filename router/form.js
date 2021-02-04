const express = require("express");
const router = express.Router();
const sessionCheck = require("../feature/sessionCheck");

router.get("/form", (req, res) => {
    if(!sessionCheck.sessionCheck(req.session)){
        let html = "<script>alert('토큰 값을 입력해 주세요'); location.href='/';</script>";
        res.send(html);
        return;
    }
    res.render("submit");
});

module.exports = router;