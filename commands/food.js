const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'food',
	description: 'Sends random food image!',
	execute(message, args) {
		const randomCat = require('random-cat')
		let embed = new MessageEmbed()
			.setImage(randomCat.get({
				width: 500,
				height: 500,
				category: 'food'
			}))
		message.channel.send(embed);
	},
};