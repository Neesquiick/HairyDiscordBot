const discord = require("discord.js");
const config = require("./config.json");
const stringtopf = require("./stringtopf.json");

const client = new discord.Client();

client.on('ready', () => {
  console.log('This bot is ready to share some hair!');
  client.user.setPresence({
    activity: {
      name: `${client.users.cache.filter(user => !user.bot).size} ${stringtopf.status}`,
      type: `WATCHING`
    },
    status: `online`
  });
  setInterval(() => {
    let activities = client.user.presence.activities;
    if (activities.size < 1 || activities[0].name !== `${client.users.cache.filter(user => !user.bot).size} ${stringtopf.status}}`) {
      client.user.setPresence({
        activity: {
          name: `${client.users.cache.filter(user => !user.bot).size} ${stringtopf.status}`,
          type: `WATCHING`
        },
        status: `online`
      });
    }
  }, 300000);
});

client.on('guildMemberAdd', async (member) => {
  let rolesToGive = member.guild.roles.cache.filter(role => role.name.toLowerCase().includes('-community-') || role.name.toLowerCase().includes('bürger'));
  await member.roles.add(rolesToGive);
});

client.on('guildAdd', (guild) => {
  guild.me.setNickname('Ibbelsee V2 | Bot');
  client.user.setPresence({
    activity: {
      name: `${client.users.cache.filter(user => !user.bot).size} ${stringtopf.status}`,
      type: `WATCHING`
    },
    status: `online`
  });
});

client.login(config.token);