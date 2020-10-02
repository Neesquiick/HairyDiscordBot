const discord = require("discord.js");
const config = require("./config.json");

const client = new discord.Client();

client.on('ready', () => {
  console.log('This bot is ready to share some hair!');
  client.user.setPresence({
    activity: {
      name: `${client.users.cache.filter(user => !user.bot).size} haarige Spieler`,
      type: `WATCHING`
    },
    status: `online`
  });
});

client.on('guildMemberAdd', async (member) => {
  let rolesToGive = member.guild.roles.cache.filter(role => role.name.toLowerCase().includes('-community-') || role.name.toLowerCase().includes('bürger'));
  await member.roles.add(rolesToGive);
  member.send('Willkommen auf Ibbelsee V2!');
});

client.on('guildAdd', (guild) => {
  guild.me.setNickname('Ibbelsee V2 | Bot');
  client.user.setPresence({
    activity: {
      name: `${client.users.cache.filter(user => !user.bot).size} haarige Spieler`,
      type: `WATCHING`
    },
    status: `online`
  })
});

client.login(config.token);