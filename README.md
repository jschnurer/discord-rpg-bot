# discord-rpg-bot
An RPG bot for text play over discord

# Running
Create a `.env` file with "TOKEN=<your Bot's Api Token>" in it. Then run either `node .\index.js` or `npm run start`.

# Interacting with the bot
Any member of your server can type commands to the bot which will be executed.

## Commands
- `!damage` - Damages a user's hp via dice notation. They must first set their hp using !sethp. If no user is mentioned, damages your own hp. Examples: !damage 1d6+1, !damage @person 1d10+2
- `!heal` - Heals a user's hp via dice notation (or number). They must first set their hp using !sethp. If no user is mentioned, heals your own hp. Examples: !heal 1d6+1, !heal @person 1d10+2
- `!help` - displays list of commands with examples
- `!hp` - Checks the hp of a user. If no user is mentioned, returns your own hp. Examples: !hp, !hp @person
- `!pickone` - Picks an item from a comma-delimited list. Examples: !pickone first,second,third; !pickone attack, run, negotiate
- `!roll` - Rolls dice notation. Examples: !pickone first,second,third; !pickone attack, run, negotiate
- `!sethp` - Sets your current and max hp. Examples: !sethp 35; !sethp 6

# Adding new commands
Add the command in the same format as the others in the ./commands folder. Then update ./commands.js to import your command and add it to the list.