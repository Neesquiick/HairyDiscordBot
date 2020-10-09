const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help', 
	description: 'List all commands', 
	execute(client, message, args, storedSettings) {
        let techQuoteOfTheWeek = require('tech-quote-of-the-week').default; 
        let techQoute = techQuoteOfTheWeek()();		     
        let embed = new MessageEmbed()
            .setColor('#ffff00')
            .setTitle('All Commands')
            .setFooter(`${techQoute.text} ~ ${techQoute.author}`)
        client.commands.forEach(command => {
            embed.addField(storedSettings.prefix + command.name, command.description);
        })
        message.channel.send(embed);
    }
}; 


