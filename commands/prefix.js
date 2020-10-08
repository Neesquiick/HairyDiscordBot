module.exports = {
	name: 'prefix',
	description: 'Change the prefix.',
	async execute(message, args, storedSettings) {
    if (!message.member.permissions.has('ADMINISTRATOR')) return;
    if (args.length < 1 || args[0].length < 1) {
      let messageAsk = await message.reply('please enter the new prefix:');
      let filter = (msg => msg.author.id == message.author.id);
      messageAsk.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time']}).then(async collected => {
        storedSettings.prefix = collected.first().content.trim();
        await storedSettings.save().catch(() => {});
        message.reply(`you changed the prefix to: ${storedSettings.prefix}`);
      }).catch(collected => {
        messageAsk.delete();
        message.delete();
      });
    } else {
      storedSettings.prefix = args[0];
      await storedSettings.save().catch(() => {});
      message.reply(`you changed the prefix to: ${storedSettings.prefix}`);
    }
	},
};