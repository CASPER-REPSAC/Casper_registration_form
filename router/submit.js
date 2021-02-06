const express = require("express");
const router = express.Router();
var mongoose = require('mongoose');

/*=====Route Modules=====*/
const sessionCheck = require("../feature/sessionCheck");
const bot = require("../bot");
const User = require("../models/user");


router.post('/submit',(req,res)=>{       //submit 접속 세션 체크
    if(!sessionCheck.sessionCheck(req.session)){
        let html = "<script>alert('토큰 값을 입력해 주세요'); location.href='/';</script>";
        res.send(html);
        return;
    }

    const username = req.body.username;
    const userid = req.body.userid;
    const email = req.body.email;
    const nas = (req.body.nas == "true") ? "true" : "false";
    const wiki = (req.body.wiki == "true") ? "true" : "false";
 
    if(check(username, userid,email)){
        const message = `username: ${username}\nuserid: ${userid}\nemail:${email}\nnas: ${nas}\nwiki: ${wiki}`;
        bot.sendBot(message,"계정 신청");

        /* ======Database Connect===== */
        console.log(req.body);
        User.find({ userid:req.body.userid })
            .exec()
            .then(user => {
                if (user.length >= 1) {
                    res.send('<script>alert("이미 존재하는 아이디입니다."); location.href="/form"; </script>');
                } 
                else {
                    const alarm = new User({
                        _id: new mongoose.Types.ObjectId(),
                        userid: req.body.userid,
                        username:req.body.username,
                        email:req.body.email,
                        nas: req.body.nas,
                        wiki: req.body.wiki,
                        done: false
                    });  
                    alarm
                        .save()
                        .then(result => {
                            console.log(result);
                        })
                        .catch(err => {
                            console.log(err);
                        });          
                    }
        });
        /* ========================== */
        let html = "<script>alert('신청이 완료 되었습니다.'); location.href='/form';</script>";
        res.send(html);
        return;
    }
    else{
        let html = "<script>alert('항목을 알맞게 입력해주세요.'); location.href='/form';</script>";
        res.send(html);
        return; 
    }
})

function check(username, userid, email){
    if((username.length + userid.length + email.length) == 0){
        return false;
    }
    return true;
}

module.exports = router;
