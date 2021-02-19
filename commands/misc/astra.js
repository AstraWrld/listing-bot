
const Discord = require("discord.js");

module.exports = {
    name: "astra",
    category: "misc",
    description: "Gives credits to Astra Development // Deleteing this command will result in you breaking my ToS",
    run: async (client, message, args) => {
        message.delete()
       const shitter = new Discord.MessageEmbed();
       shitter.setAuthor('Listing Bot // By Astra Development (Astra#2100)')
       shitter.setDescription(`This bot was created by Astra and the owner of this discord is licensed under Astra Development TOS.\n\n> Discord: [Click Me](https://discord.gg/HpAZ8qcn2C)`)
       shitter.setColor("82d3f3")
       shitter.setFooter('Created By: Astra Development // Astra#2100')
       message.channel.send(shitter)
    }
}