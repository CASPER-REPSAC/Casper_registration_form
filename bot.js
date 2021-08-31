const {Client, MessageEmbed} = require('discord.js');
const Discord = require('discord.js');
const client = new Client();
const config = require('./config/token.json');
const webhookClient = new Discord.WebhookClient(config.webhookID, config.webhookToken);

/*=====Database Modules=====*/
const mongoose = require("mongoose");
const {MongoClient} = require('mongodb');
//const dbClient = new MongoClient();
//const Server = require("mongodb").Server;

const sendBot = (title, message) => {
    const embed = new Discord.MessageEmbed()
    .setTitle(title)
    .setColor('#0099ff');

    webhookClient.send(message, {
        username: 'Casper the Friendly Ghost', //
        avatarURL: 'https://www.casper.or.kr/xe/files/attach/xeicon/favicon.ico',
        embeds: [embed],
    });
}

function sliceByByte(str, maxByte) {
	for(b=i=0;c=str.charCodeAt(i);) { 
      b+=c>>7?2:1;
      if (b > maxByte)
      break;
      i++;    
    }
  	return str.substring(0,i);
}
function Rpad(str,padLen,padStr){
    if (padStr.length > padLen) {
        console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
        return str + "";
    }
    str += ""; // 문자로
    padStr += ""; // 문자로
    while (str.length < padLen)
        str += padStr;
    str = str.length >= padLen ? str.substring(0, padLen) : str;
    return str;
}

client.on('ready', async()=>{
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity({type:'LISTENING',name:">help | 명령어확인"}); 
});

client.on('message', async(msg)=>{
    if(msg.content[0] === '>'){ //'msg.content' is command in this instance
        if(msg.content.slice(1)==='dice'){
            let number = Math.random()*100
            number = number.toFixed(0)
            let chooser = Math.random() * 100
            chooser = chooser.toFixed(0)
            let comment = "아악!"
            if(number <= 100 && number > 90){
                if(chooser <= 100 && chooser > 90){
                    comment = "진짜 미쳤습니다!! 축하합니다! "
                }
                else if(chooser <= 90 && chooser > 80){
                    comment = "눈으로 봐도 믿기지 않습니다!! "
                }
                else if(chooser <= 80 && chooser > 60){
                    comment = "미모의 신에는 차은우, 미모의 여신에는 조이가 있다면 주사위의 신은 당신입니다! "
                }
                else if(chooser <= 60 && chooser > 40){
                    comment = "정말 대단합니다! "
                }
                else if(chooser <= 40 && chooser > 20){
                    comment = "이거... 진짜 맞나요? "
                }
                else if(chooser <= 20 && chooser > 10){
                    comment = "떡상!!! "
                }
                else{
                    comment = "옆 사람 몰래 주사위를 두 번 굴려 "
                }
            }
            else if(number <= 90 && number > 80){
                if(chooser <= 100 && chooser > 90){
                    comment = "대단합니다! "
                }
                else if(chooser <= 90 && chooser > 80){
                    comment = "보람찬 결과네요!"
                }
                else if(chooser <= 80 && chooser > 60){
                    comment = "학교를 출튀하고 주사위를 던져 "
                }
                else if(chooser <= 60 && chooser > 40){
                    comment = "이 정도면 좋은데요? "
                }
                else if(chooser <= 40 && chooser > 20){
                    comment = "상위 23% 정도? "
                }
                else if(chooser <= 20 && chooser > 10){
                    comment = "전 재산을 바쳐 주사위를 던져 "
                }
                else{
                    comment = "부리또 2번세트를 마다하고 주사위를 던져 "
                }
            }
            else if(number <= 80 && number > 60){
                if(chooser <= 100 && chooser > 90){
                    comment = "나쁘지 않습니다. "
                }
                else if(chooser <= 90 && chooser > 80){
                    comment = "ㅍㅌㅊ... "
                }
                else if(chooser <= 80 && chooser > 60){
                    comment = "별 기대도 안했는데 "
                }
                else if(chooser <= 60 && chooser > 40){
                    comment = "주사위를 던져 "
                }
                else if(chooser <= 40 && chooser > 20){
                    comment = "평균은 넘었습니다! "
                }
                else if(chooser <= 20 && chooser > 10){
                    comment = "앞 사람보다 조금 더 열심히 던져 "
                }
                else{
                    comment = "앞 사람 대신 던져 "
                }
            }
            else if(number <= 60 && number > 40){
                if(chooser <= 100 && chooser > 90){
                    comment = "당신의 능력 10%를 사용하여 "
                }
                else if(chooser <= 90 && chooser > 80){
                    comment = "주사위를 조작하여 "
                }
                else if(chooser <= 80 && chooser > 60){
                    comment = "반 타작은 했네요. "
                }
                else if(chooser <= 60 && chooser > 40){
                    comment = "온 힘을 다한 결과가 이겁니다."
                }
                else if(chooser <= 40 && chooser > 20){
                    comment = "뭐... 봐줄만 한건지... "
                }
                else if(chooser <= 20 && chooser > 10){
                    comment = "노력은 했나요?  "
                }
                else{
                    comment = "쩝... "
                }
            }
            else if(number <= 40 && number > 20){
                if(chooser <= 100 && chooser > 90){
                    comment = "생일 축하합니다! "
                }
                else if(chooser <= 90 && chooser > 80){
                    comment = "능력의 200%를 사용하여 "
                }
                else if(chooser <= 80 && chooser > 60){
                    comment = "지각했지만 신경쓰지않고 주사위를 던져 "
                }
                else if(chooser <= 60 && chooser > 40){
                    comment = "과제도 내팽겨치고 "
                }
                else if(chooser <= 40 && chooser > 20){
                    comment = "인생은 쉽지 않습니다... "
                }
                else if(chooser <= 20 && chooser > 10){
                    comment = "집도 뛰쳐나와 주사위를 던져 "
                }
                else{
                    comment = "주사위 대신 컴퓨터를 던져 "
                }
            }
            else if(number <= 20 && number > 10){
                if(chooser <= 100 && chooser > 90){
                    comment = "그럴 수 있습니다. "
                }
                else if(chooser <= 90 && chooser > 80){
                    comment = "모니터를 던져 "
                }
                else if(chooser <= 80 && chooser > 60){
                    comment = "지갑을 연못에 빠뜨렸더니 "
                }
                else if(chooser <= 60 && chooser > 40){
                    comment = "당신의 능력 50%를 사용하여 "
                }
                else if(chooser <= 40 && chooser > 20){
                    comment = "다음엔 더 좋은 결과가 있겠죠... "
                }
                else if(chooser <= 20 && chooser > 10){
                    comment = "집도 뛰쳐나와 주사위를 던져 "
                }
                else{
                    comment = "진짜 던진 척만 한건지"
                }
            }
            else{
                if(chooser <= 100 && chooser > 90){
                    comment = "ㅋㅋㅋㅅㄱ "
                }
                else if(chooser <= 90 && chooser > 80){
                    comment = "와~ 정말 데단헤~! "
                }
                else if(chooser <= 80 && chooser > 60){
                    comment = "잠이나 자십쇼  "
                }
                else if(chooser <= 60 && chooser > 40){
                    comment = "ㅉㅉ "
                }
                else if(chooser <= 40 && chooser > 20){
                    comment = "에휴...  "
                }
                else if(chooser <= 20 && chooser > 10){
                    comment = "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ "
                }
                else{
                    comment = "진짜 던진 척만 한건지"
                }
            }
            const embed = new MessageEmbed()
                .setTitle(`${comment} ${number} 이(가) 나왔습니다.\n`)
                .setColor('#ff5b97');
            msg.channel.send(embed)
        }
        if(msg.content.slice(1)==='ladder'){
            if (!msg.member.voice.channel) {
                return msg.channel.send('First you need to join a voice channel');
            }
            let members = msg.member.voice.channel.members
            let randomize = members
                    .map(a=>([Math.random(),a]))
                    .sort((a,b) => a[0]-b[0])
                    .map(a => a[1])

            const embed = new MessageEmbed()
                .setTitle(`현재 채널 : ${msg.member.voice.channel.name}\n총 인원 : ${randomize.length} 명\n무작위 수에 의해 순서를 결정했습니다.\n`)
                .setDescription(randomize.map((i) => `${randomize.indexOf(i) + 1}. ${i}`).join("\n"))
            msg.channel.send(embed)
        }
        if(msg.content.slice(1)==='help'){
            const commandlists = "│help   │Print Commands List             │Option │\n│account│Find all apply accounts         │       │\n│ladder │Randomize in voice channel      │       │\n│dice   │Random Number  0~100            │       │\n"
            msg.reply("\`명령어 목록\n┌───────┬────────────────────────────────┬───────┐\n"+commandlists+"└───────┴────────────────────────────────┴───────┘\`"); //50
        }
        if(msg.content.slice(1)==='account'){
            MongoClient.connect("mongodb://127.0.0.1:27017/", (err,db)=>{
                let alarmDB = db.db('casperbot');
                alarmDB.collection("users", (err, users)=>{
                    users.find((err,items)=>{
                        items.toArray((err,itemArr)=>{
                            let messageApply= '\`신청 계정 목록\n┌────────────┬───────────────┬─────┬─────┬─────┐\n│username    │userid         │nas  │wiki │auth │\n├────────────┼───────────────┼─────┼─────┼─────┤\n';
                            console.log(itemArr);
                            for(let i = 0;i<itemArr.length;i++){
                                //console.log('username: '+itemArr[i].username +'    userid: '+itemArr[i].userid);
                                messageApply = messageApply + '│'+ sliceByByte(Rpad(itemArr[i].username,14,'  '),14) +'│'+ Rpad(itemArr[i].userid,15,' ')+'│'+Rpad(itemArr[i].nas,5,' ')+'│'+Rpad(itemArr[i].wiki,5,' ')+'│'+Rpad(itemArr[i].done,5,' ')+'│'+'\n';
                                if(i === itemArr.length-1){
                                    messageApply = messageApply + '└────────────┴───────────────┴─────┴─────┴─────┘\`'
                                    msg.reply(messageApply);
                                    console.log(messageApply);
                                }
                            }
                        });
                    });                    
                });
            });
        }
    }
});
client.login(config.token); //token login

exports.sendBot = sendBot;
