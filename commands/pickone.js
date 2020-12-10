module.exports = {
  command: "!pickone",
  isMatch: (msg) => msg.content.toLowerCase().startsWith('!pickone'),
  helpText: "Picks an item from a comma-delimited list. Examples: `!pickone first,second,third;` `!pickone attack, run, negotiate`",
  execute: (msg) => {
    try {
      let listText = msg.content.replace('!pickone', '');
      if (listText.indexOf(',') === -1) {
        throw new Error("pickone: text has no commas");
      }
  
      const items = listText
        .split(',')
        .filter(x => x.trim().length > 0)
        .map(x => x.trim());
  
      if (items.length < 2) {
        throw new Error("pickone: item list empty");
      }
  
      var item = items[Math.floor(Math.random() * items.length)];
  
      msg.channel.send("🧾 I picked `" + item + "`");
    } catch (err) {
      console.log(err);
      msg.reply("I didn't understand your syntax. Try \"!help\".");
    }
  },
};