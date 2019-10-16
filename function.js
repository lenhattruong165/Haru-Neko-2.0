const Discord = require("discord.js");

function argsmax(message, infinity){

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let reason = args[infinity];
    if (args[infinity+1]) { n = 1; }
    else n = 0;
            
    while(n > 0)
    {
        n++;
        if (args[n]){
            reason = `${reason} ${args[n]}`;
        }
        else n = 0;
    }

    return reason;
}