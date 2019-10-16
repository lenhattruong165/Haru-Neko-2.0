const Discord = require("discord.js");

module.exports.run = async (_client, message, args) =>{
    if(message.author.tag != "Neko Cyan#1717" & message.author.tag != "Tiên Tri Vũ Trụ Nam Hải#2360") return;

        if(!args[0]) return message.channel.sendMessage(`${prefix}${cmd} <GuildID/ChannelID/RoleID> [Mention/ID of Channel/Role]`)

        if(args[0].toLowerCase() == "guildid") { message.channel.sendMessage(message.guild.id); }

        if(args[0].toLowerCase() == "channelid"){
            let getchanel = (message.mentions.channels.first() || message.guild.channels.get(args[1]))
            if(!getchanel) return message.channel.sendMessage("Channel not found!");
            else message.channel.sendMessage(getchanel.id);
        }

        if(args[0].toLowerCase() == "roleid"){
            let getrole = (message.mentions.roles.first() || message.guild.roles.get(args[1]) || message.guild.roles.find("name", args.slice(1).join(" ")))
            if(!getrole) return message.channel.sendMessage("Roles not found!");
            else message.channel.sendMessage(getrole.id);
        }
}

module.exports.help = {
    name: "bestcmdever"
}