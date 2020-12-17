const jokes = require("../jokes");

module.exports = {
  command: "!joke",
  isMatch: (msg) => msg.content.toLowerCase().startsWith('!joke'),
  helpText: "The bot will try to be funny. Operative word: try.",
  execute: (msg) => {
    msg.channel.send(`🤪 ${jokes[Math.floor(Math.random() * jokes.length)]}`);
  },
};