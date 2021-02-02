const Discord = require('discord.js');
const config = require('./config/token.json');
const client = new Discord.Client();
const webhookClient = new Discord.WebhookClient(config.webhookID, config.webhookToken)
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
    if(msg.content === 'ping'){ //'msg.content' is command in this instance
        msg.reply('Capser !!!!!!!!!!!!!!');
    }
});


client.login(config.token); //token login

exports.sendBot = sendBot;