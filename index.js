const discord = require("discord.js");
const stringbucket = require("./stringbucket.json");

const client = new discord.Client();

client.on('ready', () => {
  console.log('This bot is ready to share some hair!');
  client.user.setPresence({
    activity: {
      name: `${client.users.cache.filter(user => !user.bot).size} ${stringbucket.status}`,
      type: `WATCHING`
    },
    status: `online`
  });
  // Set status every 5 minutes
  setInterval(() => {
    let activities = client.user.presence.activities;
    if (activities.size < 1 || activities[0].name !== `${client.users.cache.filter(user => !user.bot).size} ${stringbucket.status}}`) {
      client.user.setPresence({
        activity: {
          name: `${client.users.cache.filter(user => !user.bot).size} ${stringbucket.status}`,
          type: `WATCHING`
        },
        status: `online`
      });
    }
  }, 300000);
});

client.on('guildAdd', (guild) => {
  guild.me.setNickname(`${guild.name} | Bot`);
  client.user.setPresence({
    activity: {
      name: `${client.users.cache.filter(user => !user.bot).size} ${stringbucket.status}`,
      type: `WATCHING`
    },
    status: `online`
  });
});

client.login(require("./token.json").token);
