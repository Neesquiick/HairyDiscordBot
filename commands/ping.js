const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ping', 
	description: 'Pong', 
	execute(client, message, args) { 		     
          message.channel.send('Pinging...').then(sent => {
            sent.edit(`Pong. Took ${sent.createdTimestamp - message.createdTimestamp}ms`);
          });                  
	},
};
