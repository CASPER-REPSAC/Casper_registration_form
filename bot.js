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
            let comment = "아악!"
            if(number <= 100 && number > 90){
                comment = "진짜 미쳤습니다!! 축하합니다! "
            }
            else if(number <= 90 && number > 80){
                comment = "보람찬 결과네요!"
            }
            else if(number <= 80 && number > 60){
                comment = "별 기대도 안했는데 "
            }
            else if(number <= 60 && number > 40){
                comment = "온 힘을 다한 결과가 이겁니다."
            }
            else if(number <= 40 && number > 20){
                comment = "운이 좋진 않네요... "
            }
            else if(number <= 20 && number > 10){
                comment = "집도 뛰쳐나와 주사위를 던져 "
            }
            else{
                comment = "진짜 던진 척만 한건지"
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
            const commandlists = "│help   │Print Commands List             │Option │\n│account│Find all apply accounts         │       │\n│ladder │Randomize in voice channel      │       │\n"
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
