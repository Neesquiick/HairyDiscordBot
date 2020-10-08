const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'avatar', 
	description: 'Avatar-URL', 
	execute(message, args) { 		     
		let embed = new MessageEmbed()
			.setImage(message.author.displayAvatarURL());
		message.reply(embed);
    }
}; 