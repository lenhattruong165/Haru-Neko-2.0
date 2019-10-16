const Discord = require("discord.js");

module.exports.run = async (_client, message, args) =>{
    if(message.guild.id == 530689610313891840){
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!rUser) return message.channel.sendMessage("Không tìm thấy Người Chơi.");

        /*let n = 0;

        if (args[2]) { n = 1; }
        else n = 0;
            
        while(n > 0)
        {
            n++;
            if (args[n]){
                reason = `${reason} ${args[n]}`;
            }
            else n = 0;
        }*/

        if (!args[1]) return message.channel.sendMessage("Bạn chưa đưa ra lý do Tố Cáo.");

        let embed = new Discord.RichEmbed()
        .setAuthor("=== Player Reports ===")
        .addField("Reported By", message.author.toString())
        .addField("Reported User", rUser.toString())
        .addField("Reason", args.slice(1).join(" "))
        .setColor("#FF0000");

        let reportchannel = message.guild.channels.find("id", "630307586545156107");
        if (!reportchannel) return message.channel.sendMessage("Kênh tố cáo của Admin đã bị mất, vui lòng báo cho Admin về việc này, xin cảm ơn.");
    
        message.delete().catch(O_o=>{});
        reportchannel.sendEmbed(embed);
    }
    else return;
}

module.exports.help = {
    name: "tocao"
}