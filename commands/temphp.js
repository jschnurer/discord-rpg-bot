const { rollNotation } = require("../utilities/diceRoller");
const stripMentions = require("../utilities/stripMentions");

module.exports = {
  command: "!temphp",
  isMatch: (msg) => msg.content.toLowerCase().startsWith('!temphp'),
  helpText: "Set's the user's temp hp via dice notation (or number). If no user is mentioned, sets your own instead. Examples: `!temphp 1d6+1`, `!temphp @person 12`",
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

      if (!oldPc) {
        msg.channel.send(`I don't know ${name}'s hp. I can't set temp hp until I know their max hp! They can set their own hp by using \`!sethp <amount>\``);
        return;
      }

      const notation = stripMentions(msg.content.replace("!temphp", "").trim()).trim();

      const result = rollNotation(notation);

      if (result === null) {
        console.log(notation);
        console.log(result);
        msg.channel.send("I didn't understand your dice notation.");
        return;
      }

      oldPc.temphp = result;
  
      botMemory.save();
  
      msg.channel.send(`💖 ${name}: ${oldPc.hp}/${oldPc.maxhp} HP, 💙 ${result} temphp`);
    } catch (err) {
      console.log(err);
      msg.reply("ERROR: DOES NOT COMPUTE! (Something went wrong with my programming!)");
    }
  },
};