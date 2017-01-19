const Discord = require("discord.js");
const bot = new Discord.Client();

const token = "";

var debugging = false;

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.on("message", function(message) {
    // Make sure the bot doesn't disconnect.
    // Reply to the server's ping with pong.
    if (message.content === 'ping') {
        message.reply('pong');
    }

    // Make sure that only commands entered in #bot are registered.
    if (!(message.channel.name === "bot"))
        return;

    // ! command list
    if (message.content.charAt(0) === "!") {
        var tempVal = message.content.indexOf(' ');
        var command = message.content.substring(1, tempVal == -1 ? message.content.length : tempVal);
        var params = null;
 
        if (message.content.includes(' ')) {
            var params = message.content.split(' ').slice(1); // .join(' ') makes it a string with spaces.
        }
        
        switch (command) {
                
            case "profile":
                if(params == null || params.length != 2) {
                    message.channel.sendMessage("Incorrect parameters: `!profile <name> <realm>`");
                    return;
                }
                
                var playerName = params[0].toLowerCase();
                var realm = params[1].toLowerCase();
                
                message.channel.sendMessage("\
WoWArmory: <" + getArmory(realm, playerName) + ">\n\
WoWProgress: <" + getProgress(realm, playerName) + ">\n\
WarcraftLogs: <" + getLogs(realm, playerName) + ">\
");
                break;
            
            case "gprofile":
                message.channel.sendMessage("Coming soon.");
                break;
                
            // hello
            case "hello":
                message.channel.sendMessage("Hello, " + message.author.username + ".");
                break;
            
            case "help":
                message.channel.sendMessage("\
                `<> = required, [] = optional, | = or.`\n\
                \n\
                **Basic Commands**\n\
                - !hello `Sends a hello message back to the user.`\n\
                - !profile <name> <realm> `Creates links to the user's armory, wowprogress, and warcraftlogs.`\n\
                - !gprofile <name> <realm>\
                ");
                break;
            
            default:
                message.channel.sendMessage("That is not a command.");
                break;
        }
        
        // Just some debugging stuff to be used at any time.
        if (debugging) {
            console.log(message.author.username);
            console.log(message.content);
            console.log(message.content.charAt(0));
            console.log(message.content.includes(' '));
            console.log(command);
        }
    }
});

function getArmory(realm, playerName) {
    return "http://www.wowprogress.com/character/us/" + realm + "/" + playerName + "/";
}

function getProgress(realm, playerName) {
    return "http://us.battle.net/wow/en/character/" + realm + "/" + playerName + "/";
}

function getLogs(realm, playerName) {
    return "Coming soon!";
}

// Essential Functions

// http://stackoverflow.com/questions/10342728/join-array-from-startindex-to-endindex
Array.prototype.myJoin = function(seperator, start, end) {
  if (!start) start = 0;
  if (!end) end = this.length - 1;
  end++;
  return this.slice(start, end).join(seperator);
};

bot.login(token);