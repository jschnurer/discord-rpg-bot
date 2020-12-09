require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const commands = require("./commands");
const fs = require("fs");

const botMemory = {
  pcs: [],
  save: () => {
    const shallowCopy = {
      ...botMemory
    };
    delete shallowCopy.save;
    fs.writeFileSync("./botMemory.json",
      JSON.stringify(shallowCopy));
  },
};

if (fs.existsSync("./botMemory.json")) {
  const savedMemory = JSON.parse(fs.readFileSync("./botMemory.json", "utf8"));

  Object.keys(savedMemory)
    .forEach(key => botMemory[key] = savedMemory[key]);
}

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content.toLowerCase() === "!help") {
    displayHelp(msg);
    return;
  }

  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];

    if (cmd.isMatch(msg)) {
      cmd.execute(msg, botMemory);
      break;
    }
  }
});

const displayHelp = (msg) => {
  msg.channel.send('Here are the commands you can use:\n'
    + Object.keys(commands)
      .sort((a, b) => a < b ? -1 : 1)
      .map(cmdKey => "`!" + cmdKey + "` - " + commands[cmdKey].helpText)
      .join('\n'));
}