const Discord = require('discord.js');
const config = require('./config/token.json');
const client = new Discord.Client();
const webhookClient = new Discord.WebhookClient(config.webhookID, config.webhookToken);
const mongoose = require("mongoose");

/*=====Router Modules=====*/

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
        msg.reply("console...");
    
        if(msg.content.slice(1)==='apply'){
            msg.reply("준비 중");
        }
    }
});
client.login(config.token); //token login

exports.sendBot = sendBot;
