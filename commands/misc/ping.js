
const Discord = require("discord.js");

module.exports = {
    name: "ping",
    category: "misc",
    description: "Returns latency and API ping",
    run: async (client, message, args) => {
        message.delete()
       const shitter = new Discord.MessageEmbed();
       shitter.setDescription(`📬 **Pong: ${client.ws.ping}ms**`)
       shitter.setColor("82d3f3")
       shitter.setFooter('Created By: Astra Development // Astra#2100')
       message.channel.send(shitter).then(fuckingDelete => fuckingDelete.delete({ timeout: 8000 }))
    }
}