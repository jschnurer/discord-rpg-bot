module.exports = {
  command: "!party",
  isMatch: (msg) => msg.content.toLowerCase().startsWith('!party'),
  helpText: "Displays the HP values for all users that the bot remembers.",
  execute: (msg, botMemory) => {
    try {
      let txt = '';

      const users = botMemory.pcs.slice().sort((a,b) => a.name < b.name ? -1 : 1);

      for (let i = 0; i < users.length; i++) {
        let oldPc = users[i];
        txt += `❤️ ${oldPc.name}: ${oldPc.hp}/${oldPc.maxhp} HP`;
      }

      if (txt) {
        msg.channel.send(txt);
      } else {
        msg.channel.send("I don't know anyone's hp. Users can set their own hp by using `!sethp <amount>`");
      }
    } catch (err) {
      console.log(err);
      msg.reply("I didn't understand your syntax. Try \"!help\".");
    }
  },
};