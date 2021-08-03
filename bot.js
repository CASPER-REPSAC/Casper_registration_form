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
                .setTitle(`Member list of ${msg.member.voice.channel.name} channel\n총 인원 : ${randomize.length} 명`)
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
