const discord = require("discord.js");
const stringbucket = require("./stringbucket.json");
const fs = require("fs");
require("dotenv").config();

const mongoose = require("mongoose");
const GuildSettings = require("./settings.js");
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const client = new discord.Client({
  ws: {
    intents: ['GUILD_MESSAGES', 'GUILDS', 'GUILD_MEMBERS', 'GUILD_PRESENCES']
  }
});
client.commands = new discord.Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log('The Bot is ready to share some hair! 🥞');
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

client.on('message', async (message) => {
  // if the message author is a bot or the message didn't start with the prefix, ignore
  // *or if the message was send in DMs
  if (message.author.bot || !message.guild) return;

  // Retrieving the guild settings from database.
  var storedSettings = await GuildSettings.findOne({ gid: message.guild.id });
  if (!storedSettings) {
    // If there are no settings stored for this guild, we create them and try to retrieve them again.
    const newSettings = new GuildSettings({
      gid: message.guild.id
    });
    await newSettings.save().catch(()=>{});
    storedSettings = await GuildSettings.findOne({ gid: message.guild.id });
  }

  if (!message.content.startsWith(storedSettings.prefix)) return;

  const args = message.content.slice(storedSettings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args, storedSettings);
  } catch (error) {
    // Maybe send a nice and sexy emoji too
    // let emoji = message.guild.emojis.cache.find(emoji => emoji.name.includes("pepechrist"));
    message.reply(`sorry, but the owner of the bot managed to destroy the bot.`);
  }

})

client.login(process.env.TOKEN);
