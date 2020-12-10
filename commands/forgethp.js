module.exports = {
  command: "!forgethp",
  isMatch: (msg) => msg.content.toLowerCase().startsWith('!forgethp'),
  helpText: "Instructs the bot to forget the hp of a user. If no user is mentioned, forgets your own hp. Examples: `!forgethp`, `!forgethp @person`",
  execute: (msg, botMemory) => {
    try {
      const mention = msg.mentions.users.first();
      let name = "";
  
      if (!mention) {
        name = msg.author.username;
      } else {
        name = mention.username;
      }
  
      const oldPc = botMemory.pcs.find(x => x.name === name);
      if (oldPc) {
        botMemory.pcs = botMemory.pcs.filter(x => x.name !== name);
        botMemory.save();
        msg.channel.send(`I've forgotten ${name}'s hp.`);
      } else {
        msg.channel.send(`I didn't know ${name}'s hp to begin with.`);
      }
    } catch (err) {
      console.log(err);
      msg.reply("I didn't understand your syntax. Try \"!help\".");
    }
  },
};