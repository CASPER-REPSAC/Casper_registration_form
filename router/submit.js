const express = require("express");
const router = express.Router();
const sessionCheck = require("../feature/sessionCheck");
const bot = require("../bot");

router.post('/submit',(req,res)=>{       //submit 접속 세션 체크
    if(!sessionCheck.sessionCheck(req.session)){
        let html = "<script>alert('토큰 값을 입력해 주세요'); location.href='/';</script>";
        res.send(html);
        return;
    }

    const username = req.body.username;
    const userid = req.body.userid;
    const nas = (req.body.nas == "true") ? "true" : "false";
    const wiki = (req.body.wiki == "true") ? "true" : "false";
 
    if(check(username, userid)){
        const message = `username: ${username}\nuserid: ${userid}\nnas: ${nas}\nwiki: ${wiki}`;
        bot.sendBot(message,"계정 신청");

        //TODO DB에 데이터 넣기

        let html = "<script>alert('신청이 완료 되었습니다.'); location.href='/form';</script>";
        res.send(html);
    }
    else{
        let html = "<script>alert('항목을 알맞게 입력해주세요.'); location.href='/form';</script>";
        res.send(html);
        return; 
    }
})

function check(username, userid){
    if((username.length + userid.length) == 0){
        return false;
    }
    return true;
}

module.exports = router;