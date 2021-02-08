const Discord = require('discord.js');
const config = require('./config/token.json');
const client = new Discord.Client();
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


client.on('ready', function(){
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(">help   |Casper"); 
});

client.on('message', function(msg){
    if(msg.content[0] === '>'){ //'msg.content' is command in this instance
        if(msg.content.slice(1)==='help'){
            msg.reply("\`명령어 목록\n┌───────┬────────────────────────────────┬───────┐\n│help   │Print Commands List             │Option │\n│apply  │Find unauthorized accounts      │d      │\n└───────┴────────────────────────────────┴───────┘\`"); //50
        }
        if(msg.content.slice(1)==='apply'){
            MongoClient.connect("mongodb://127.0.0.1:27017/", (err,db)=>{
                let alarmDB = db.db('casperbot');
                alarmDB.collection("users", (err, users)=>{
                    users.find((err,items)=>{
                        items.toArray((err,itemArr)=>{
                            let messageApply= '\`미승인 계정 목록\n┌──────────────┬───────────────┬─────┬─────┬─────┐\n│username      │userid         │nas  │wiki │auth │\n├──────────────┼───────────────┼─────┼─────┼─────┤\n';
                            console.log(itemArr);
                            for(let i = 0;i<itemArr.length;i++){
                                //console.log('username: '+itemArr[i].username +'    userid: '+itemArr[i].userid);
                                messageApply = messageApply + '│'+ sliceByByte(Rpad(itemArr[i].username,14,'  '),14) +'│'+ Rpad(itemArr[i].userid,15,' ')+'│'+Rpad(itemArr[i].nas,5,' ')+'│'+Rpad(itemArr[i].wiki,5,' ')+'│'+Rpad(itemArr[i].done,5,' ')+'│'+'\n';
                                if(i === itemArr.length-1){
                                    messageApply = messageApply + '└──────────────┴───────────────┴─────┴─────┴─────┘\`'
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
