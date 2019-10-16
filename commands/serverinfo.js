const Discord = require("discord.js");

module.exports.run = async (_client, message, args) =>{
    let server = message.guild;
    let serveravatar = server.iconURL;
    let embed = new Discord.RichEmbed()
        
    .setAuthor(`${server.name}`, serveravatar)
    .setThumbnail(server.iconURL)
    .addField(`Owner`, server.owner.toString(), true)
    .addField(`Region`, server.region, true)
    .addField(`Members`, server.members.size, true)
    .addField(`Roles`, server.roles.size, true)
    .addField(`Server Created On`, server.createdAt)
    .setFooter(`Server ID ${server.id}`)
    .setColor("#FF33FF");

    return message.channel.sendEmbed(embed);
}

module.exports.help = {
    name: "serverinfo"
}