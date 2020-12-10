const { rollNotation } = require("../utilities/diceRoller");
const stripMentions = require("../utilities/stripMentions");

module.exports = {
  command: "!damage",
  isMatch: (msg) => msg.content.toLowerCase().startsWith('!damage'),
  helpText: "Damages a user's hp via dice notation (or number). They must first set their hp using `!sethp`. If no user is mentioned, damages your own hp. Examples: `!damage 1d6+1`, `!damage @person 1d10+2`",
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
        msg.channel.send(`I don't know ${name}'s hp. They can set their own hp by using \`!sethp <amount>\``);
        return;
      }

      const notation = stripMentions(msg.content.replace("!damage", "").trim()).trim();

      const result = rollNotation(notation);

      if (result === null) {
        console.log(notation);
        console.log(result);
        msg.channel.send("I didn't understand your dice notation.");
        return;
      }

      if (oldPc.temphp) {
        oldPc.temphp -= result;

        if (oldPc.temphp < 0) {
          oldPc.hp += oldPc.temphp;
          oldPc.temphp = 0;
        }
      } else {
        oldPc.hp -= result;
      }

      botMemory.save();

      msg.channel.send(`⚔️ ${oldPc.name} takes ${result} damage and is reduced to ${oldPc.hp}/${oldPc.maxhp} HP`
        + (oldPc.temphp
          ? `, 💙 ${oldPc.temphp} temphp!`
          : "!"));
    } catch (err) {
      console.log(err);
      msg.reply("I didn't understand your syntax. Try \"!help\".");
    }
  },
};