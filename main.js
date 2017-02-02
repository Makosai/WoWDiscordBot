const Discord = require("discord.js");
const bot = new Discord.Client();

var token = ""; // Put your token in here or in the token.txt file.

var debugging = false;

const fs = require("fs");
const guildName = "R E D E M P T I O N";

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
            params = message.content.substring(tempVal, message.content.length).split(',').map(function(item) {
              return item.trim();
            });
        }
        
        switch (command) {
                
            case "profile":
                if(params == null || (params.length != 2 && params.length != 3)) {
                    message.channel.sendMessage("Incorrect parameters: `!profile <name>, <realm>, [region Default: US]` " + message.content.split(' ', 2)[1] + " -");
                    console.log(params);
                    
                    return;
                }
                
                var playerName = params[0].toLowerCase();
                var realm = params[1].toLowerCase();
                var region = params.length == 3 ? params[2].toLowerCase() : params.length == 2 ? "us" : null;
                
                message.channel.sendMessage("\
WoWArmory: <" + getArmory(realm, playerName, region) + ">\n\
AskMrRobot: <" + getAMR(realm, playerName, region) + ">\n\
WoWProgress: <" + getProgress(realm, playerName, region) + ">\n\
WarcraftLogs: <" + getLogs(realm, playerName, region) + ">\
");
                break;
            
            case "gprofile":
                message.channel.sendMessage("Coming soon.");
                break;
                
            case "attendance":
                message.channel.sendMessage("Warcraft Logs Attendance for *" + guildName + "*: https://www.warcraftlogs.com/guilds/attendance/213546");

            case "trials":
                message.channel.sendMessage("*" + guildName + "* requires trial members to meet a certain quota to become raiders. You can check your attendance progress here: https://www.warcraftlogs.com/guilds/attendance/213546");
            
            case "logs":
                message.channel.sendMessage("All Warcraft Logs for *" + guildName + "*: https://www.warcraftlogs.com/guilds/reportslist/213546/");
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
    - !profile <name> <realm> [region Default: US]`Creates links to the user's armory, wowprogress, and warcraftlogs.`\n\
    - !gprofile <name> <realm> [region Default: US] `Coming soon!`\
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

function getArmory(realm, playerName, region) {
    return "http://" + region + ".battle.net/wow/en/character/" + realm.replace(/ /g,"-") + "/" + playerName + "/advanced";
}

function getAMR(realm, playerName, region) {
    return "http://www.askmrrobot.com/wow/gear/" + region + "/" + realm.replace(/ /g,"_") + "/" + playerName + "/";
}

function getProgress(realm, playerName, region) {
    return "http://www.wowprogress.com/character/" + region + "/" + realm.replace(/ /g,"-") + "/" + playerName + "/";
}

function getLogs(realm, playerName, region) {
    return "https://www.warcraftlogs.com/rankings/character_name/" + playerName + "/" + realm.replace(/ /g,"-") + "/" + region + "/";
}

// Essential Functions

// http://stackoverflow.com/questions/10342728/join-array-from-startindex-to-endindex
Array.prototype.myJoin = function(seperator, start, end) {
  if (!start) start = 0;
  if (!end) end = this.length - 1;
  end++;
  return this.slice(start, end).join(seperator);
};

// http://stackoverflow.com/a/29016268
function checkForFile(fileName,callback)
{
    fs.exists(fileName, function (exists) {
        if(exists)
        {
            callback();
        }else
        {
            fs.writeFile(fileName, token, {flag: 'wx'}, function (err, data) 
            { 
                callback();
            })
        }
    });
}








// Login
checkForFile('token.txt', function() {
    fs.readFile('token.txt', 'utf8', function(err, contents) {
        if(contents.length > 0)
            token = contents;

        bot.login(token);
    });
});
