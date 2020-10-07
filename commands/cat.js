module.exports = {
	name: 'cat',
	description: 'Sends random cat image!',
	execute(message, args) {
    // Establish connection to API
    // ..done
		// Send message
		const { MessageEmbed } = require('discord.js');
		let embed = new MessageEmbed({
			title: "haha",
			description: "haha"
		})
		message.channel.send(embed)
	},
};