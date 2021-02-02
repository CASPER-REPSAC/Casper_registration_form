const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./config/token.json'); //token instance

client.on('ready', function(){
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', function(msg){
    if(msg.content === 'ping'){ //'msg.content' is command in this instance
        msg.reply('Capser !!!!!!!!!!!!!!');
    }
});

client.login(token.token); //token login