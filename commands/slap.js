const Discord = require("discord.js");
const client = require('nekos.life');
const nekoslife = new client();

module.exports.run = async (_client, message, args) =>{
    if(!args[0]) return message.channel.send("You must choose user to Slap.").then( msg => { msg.delete(5000); });
        const getuser = message.guild.member( message.mentions.users.first() || message.guild.members.get(args[0]) || message.guild.members.find("displayName", args.join(" ")) );
        if(!getuser) return message.channel.send(`User not Found!`).then( msg => { msg.delete(5000); });
        
        const slap = await nekoslife.sfw.slap();
        const embed = new Discord.RichEmbed()
        .setDescription(`Hey ${getuser.toString()}, ${message.author.toString()} Slapped you!`)
        .setImage(slap.url)
        .setTimestamp()
        .setFooter("Powered by nekos.life")
        .setColor("#FF33FF");
                    
        await message.channel.sendEmbed(embed);
}

module.exports.help = {
    name: "slap"
}