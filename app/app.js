import Discord from 'discord.js';
import MessageParser from './command-parser';
import Config from './../config.json';

const client = new Discord.Client();


client.on('ready', () => {
  console.log('Bot launched');  
});

client.on('message', message => {
  const messageParser = new MessageParser(message);
  messageParser.analyzeMessage();
});


client.login(Config.token);