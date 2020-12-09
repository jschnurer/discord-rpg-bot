const { rollNotation } = require("../utilities/diceRoller");

module.exports = {
  isMatch: (msg) => msg.content.toLowerCase().startsWith('!roll'),
  helpText: "Rolls dice notation. Examples: `!pickone first,second,third`; `!pickone attack, run, negotiate`",
  execute: (msg) => {
    try {
      let notation = msg.content.replace('!roll', '');
      const result = rollNotation(notation.trim());
  
      if (result === null) {
        throw new Error();
      }
  
      msg.channel.send(`🎲 ${notation} 🡆 ${result}`);
    } catch (err) {
      console.log(err);
      msg.reply("I didn't understand your syntax. Try \"!help\".");
    }
  },
};