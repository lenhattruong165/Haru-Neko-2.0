const Discord = require("discord.js");

module.exports.run = async (_client, message, args) =>{
    let harunekoowner = _client.users.get("454492255932252160");
    let harunekoownertag = _client.users.get("454492255932252160").tag;
    let harunekoowneravatar = harunekoowner.displayAvatarURL;
    let harunekotag = _client.user.tag;
    let harunekoavatar = _client.user.displayAvatarURL;

    let getcreateon = _client.user.createdAt;
    let anything = `${getcreateon}`;
    let harunekocreateon = anything.replace("GMT+0000 (UTC)", "(GMT/UTCnode  + 0)");

    let embed = new Discord.RichEmbed()
        
    .setAuthor(`=== Bot Information ===`)
    .setThumbnail(harunekoavatar)
    .addField(`Bot Name`,harunekotag)
    .addField(`Created On`, harunekocreateon)
    .setFooter(`Bot by ${harunekoownertag}`, harunekoowneravatar)
    .setColor("#00FF00");

    return message.channel.sendEmbed(embed);
}

module.exports.help = {
    name: "botinfo"
}