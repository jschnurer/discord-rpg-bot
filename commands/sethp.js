module.exports = {
  isMatch: (msg) => msg.content.toLowerCase().startsWith('!sethp'),
  helpText: "Sets your current and max hp. Examples: `!sethp 35;` `!sethp 6`",
  execute: (msg, botMemory) => {
    try {
      let text = msg.content.replace('!sethp', '');
  
      let hpAmt = parseInt(text, 10);
  
      if (isNaN(hpAmt)) {
        msg.reply("I didn't understand your hp number.");
        return;
      }
  
      const name = msg.author.username;
  
      if (!name) {
        msg.reply("I'm not sure who you are. I can't find your username!");
        return;
      }
  
      const oldPc = botMemory.pcs.find(x => x.name === name);
      if (oldPc) {
        oldPc.hp = hpAmt;
        oldPc.maxhp = hpAmt;
      } else {
        botMemory.pcs.push({
          name,
          hp: hpAmt,
          maxhp: hpAmt,
        });
      }
  
      botMemory.save();
  
      msg.channel.send(`💖 ${name}: ${hpAmt}/${hpAmt} hp.`);
    } catch (err) {
      console.log(err);
      msg.reply("I didn't understand your syntax. Try \"!help\".");
    }
  },
};