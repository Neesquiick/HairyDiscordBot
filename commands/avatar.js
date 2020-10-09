const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'avatar', 
	description: 'Avatar-URL Embed', 
	execute(client, message, args) { 		     
		let embed = new MessageEmbed()
			.setImage(message.author.displayAvatarURL());
		message.reply(embed);
    }
}; 