module.exports = {
  isMatch: (msg) => msg.content.toLowerCase().startsWith('!hp'),
  helpText: "Checks the hp of a user. If no user is mentioned, returns your own hp. Examples: `!hp`, `!hp @person`",
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
        msg.channel.send(`❤️ ${oldPc.name}: ${oldPc.hp}/${oldPc.maxhp} HP`);
      } else {
        msg.channel.send("I don't know that person's hp. They can set their own hp by using `!sethp <amount>`");
      }
    } catch (err) {
      console.log(err);
      msg.reply("I didn't understand your syntax. Try \"!help\".");
    }
  },
};