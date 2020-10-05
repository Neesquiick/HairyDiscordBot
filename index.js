const discord = require("discord.js");
const config = require("./config.json");
const stringbucket = require("./stringbucket.json");
const { TeamSpeak, QueryProtocol } = require('ts3-nodejs-library');

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
  /* Do this stuff every 5 minutes. Lower == Ratelimit */
  setInterval(() => {
    // Set status
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
    // Refresh User Count channels
    TeamSpeak.connect({
      host: '193.70.49.219',
      protocol: QueryProtocol.RAW,
      queryport: 10011,
      serverport: 9987,
      username: config.queryUsername,
      password: config.queryPassword,
      nickname: stringtopf.queryNickname
    }).then(async teamspeak => {
      const clients = await teamspeak.clientList({ clientType: 0 });
      let chT = client.channels.cache.find(channel => channel.id == "762729555122192384");
      let chD = client.channels.cache.find(channel => channel.id == "762729035347525673");
      chD.setName(`『 ${client.users.cache.filter(user => user.presence.status != "offline" && !user.bot).size} 』Discord`);
      chT.setName(`『 ${clients.length} 』Teamspeak`);
    }).catch(e => console.error(e))
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
