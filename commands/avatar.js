const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'avatar', 
	description: 'Avatar-URL', 
	execute(message, args) { 		     
        message.reply(message.author.displayAvatarURL());
        }
}; 