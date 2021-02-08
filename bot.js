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

client.on('ready', function(){
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', function(msg){
    if(msg.content[0] === '>'){ // '>' is command
        if(msg.content.slice(1)==='help'){
            msg.reply(">apply : nas, wiki 미승인 계정 확인\n\t옵션 -d [True/False] : 미승인 계정 승인 여부 변경\n");
        }
        if(msg.content.slice(1)==='apply'){
            MongoClient.connect("mongodb://127.0.0.1:27017/", (err,db)=>{
                let alarmDB = db.db('casperbot');
                alarmDB.collection("users", (err, users)=>{
                    users.find((err,items)=>{
                        items.toArray((err,itemArr)=>{
                            const messageD = itemArr.toString();
                            console.log(itemArr);
                            console.log(messageD);
                            msg.reply(messageD, "미승인 목록");
                        });
                    });                    
                });
            });
        }
    }
});
client.login(config.token); //token login

exports.sendBot = sendBot;
