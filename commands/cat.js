const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'cat',
	description: 'Sends random cat image!',
	async execute(message, args) {
		const catFacts = require('get-cat-facts');
		const randomCat = require('random-cat')
		const result = await catFacts.random();
		console.log(result);
		let embed = new MessageEmbed()
			.setDescription(result[0].text)
			.setImage(randomCat.get({
				width: 500,
				height: 500
			}))
		message.channel.send(embed);
	},
};