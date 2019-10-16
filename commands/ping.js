const Discord = require("discord.js");

module.exports.run = async (_client, message, args) =>{
    const msg = await message.channel.sendMessage("Pinging...");
    msg.edit(`:ping_pong: pong!\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency is ${Math.floor(_client.ping)}ms`);
}

module.exports.help = {
    name: "ping"
}