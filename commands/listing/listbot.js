
const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports = {
    name: "listbot",
    category: "listing",
    description: "Creates a listing embed for a misc product",
    run: async (client, message, args) => {
        message.delete()
        let ansChannel,q1,q2,q3,q4,q5,q6,q8,q9 = null;
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:x: Insufficient permissions. ||MANAGE_MESSAGES|| is required.`).then(msg => msg.delete({timeout: 10000})).catch(console.error);
        const filter = m => m.author.id === message.author.id;
        message.channel.send(`Would you like to create a new listing`).then(msg => {
            msg.react('❌').then(() => msg.react('✅'));
            const filterE = (reaction, user) => {
                return ['❌', '✅'].includes(reaction.emoji.name) && user.bot == false && user.id === message.author.id;
            };
            msg.awaitReactions(filterE, { max: 1, time: ms("20m"), errors: ['time'] }).then(collected => {
                const reaction = collected.first();
                if(reaction.emoji.name === '❌') {
                    msg.delete().catch(console.error);
                    return message.channel.send(`Cancelled.`).then(msg => msg.delete({timeout: 10000})).catch(console.error);
                }
                if(reaction.emoji.name === '✅') {
                    msg.delete().catch(console.error);
                    createListingChannel();
                }
            }).catch(() => {
                msg.delete().catch(console.error);
            });
        }).catch(console.error);
    
        async function createListingChannel() {
            let everyoneRole = message.guild.roles.cache.find(role => role.name === "@everyone");
            let permissionOverwriteArray = [
                {
                    id: message.author.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                },
                {
                    id: everyoneRole.id,
                    deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                },
            ]
            message.guild.channels.create(`new-list`, {
                type: 'text', 
                permissionOverwrites: permissionOverwriteArray
            }).then(channy => {
                message.channel.send(`Builder created - <#${channy.id}>`).then(msg => msg.delete({timeout: 10000})).catch(console.error);
    
                questionZero(channy);
            });
        }
        async function questionZero(channy) {
            channy.send(`**What channel would you like the listing to be posted in?**`).then(daMessage => {
                channy.awaitMessages(filter, {max: 1, time: ms('1h'), errors: ['time']}).then(async (ans) => {
                    if(ans.first().mentions.channels.first()) {
                        ansChannel = ans.first().mentions.channels.first().id;
                    } else {
                        ansChannel = ans.first().content;
                    }
                }).then(anotherMsg => {
                    questionOne(channy)
                }).catch(console.error);
            }).catch(console.error);
        }
    
        async function questionOne(channy) {
            channy.send(`**What is the name of the bot?** Use \`NA\` to disable.`).then(daMessage => {
                channy.awaitMessages(filter, {max: 1, time: ms('1h'), errors: ['time']}).then(async (ans) => {
                    q1 = await ans.first().content;
                }).then(anotherMsg => {
                    questionTwo(channy)
                }).catch(console.error);
            }).catch(console.error);
        }
    
        async function questionTwo(channy) {
            channy.send(`**Do you have a webstore? If so link it here.** Use \`NA\` to disable.`).then(daMessage => {
                channy.awaitMessages(filter, {max: 1, time: ms('1h'), errors: ['time']}).then(async (ans) => {
                    q2 = await ans.first().content;
                }).then(anotherMsg => {
                    questionThree(channy, "")
                }).catch(console.error);
            }).catch(console.error);
        }
    
        async function questionThree(channy, error) {
            channy.send(`${error}**What would you like to set the embed color too? This must be a HEX color!** Use \`NA\` to disable.`).then(daMessage => {
                channy.awaitMessages(filter, {max: 1, time: ms('1h'), errors: ['time']}).then(async (ans) => {
                    q3 = await ans.first().content;
                }).then(anotherMsg => {
                    if(q3.startsWith("#") || q3 == "na") {
                        questionFour(channy)
                    } else {
                        questionThree(channy, "\`[ERR] Please enter a hex code\`\n")
                    }
                }).catch(console.error);
            }).catch(console.error);
        }
    
        async function questionFour(channy) {
            channy.send(`**Bot Display link. This must be an image link!** Use \`NA\` to disable.`).then(daMessage => {
                channy.awaitMessages(filter, {max: 1, time: ms('1h'), errors: ['time']}).then(async (ans) => {
                    q4 = await ans.first().content;
                }).then(anotherMsg => {
                    questionFive(channy)
                }).catch(console.error);
            }).catch(console.error);
        }
    
        async function questionFive(channy) {
            channy.send(`**What would you like to set as the main logo image? This must be an image link!** Use \`NA\` to disable.`).then(daMessage => {
                channy.awaitMessages(filter, {max: 1, time: ms('1h'), errors: ['time']}).then(async (ans) => {
                    q5 = await ans.first().content;
                }).then(anotherMsg => {
                    questionSix(channy)
                }).catch(console.error);
            }).catch(console.error);
        }
    
        async function questionSix(channy) {
            channy.send(`**What is the price of the bot?**`).then(daMessage => {
                channy.awaitMessages(filter, {max: 1, time: ms('1h'), errors: ['time']}).then(async (ans) => {
                    q6 = await ans.first().content;
                }).then(anotherMsg => {
                    questionSeven(channy)
                }).catch(console.error);
            }).catch(console.error);
        }
    
        async function questionSeven(channy) {
            channy.send(`**What are the credits to this post?** Use \`NA\` to disable.`).then(daMessage => {
                channy.awaitMessages(filter, {max: 1, time: ms('1h'), errors: ['time']}).then(async (ans) => {
                    q7 = await ans.first().content;
                }).then(anotherMsg => {
                    questionFFF(channy)
                }).catch(console.error);
            }).catch(console.error);
        }

        async function questionFFF(channy) {
            channy.send(`**What script language is this written in?** Use \`NA\` to disable.`).then(daMessage => {
                channy.awaitMessages(filter, {max: 1, time: ms('1h'), errors: ['time']}).then(async (ans) => {
                    qH = await ans.first().content;
                }).then(anotherMsg => {
                    questionEight(channy)
                }).catch(console.error);
            }).catch(console.error);
        }

        async function questionEight(channy) {
            channy.send(`**Give a description of the bot?** Use \`NA\` to disable.`).then(daMessage => {
                channy.awaitMessages(filter, {max: 1, time: ms('1h'), errors: ['time']}).then(async (ans) => {
                    q9 = await ans.first().content;
                }).then(anotherMsg => {
                    createEmbed(channy)
                }).catch(console.error);
            }).catch(console.error);
        }
    
        async function createEmbed(channy) {
            let embed = new Discord.MessageEmbed()
            if(q1.toLowerCase() !== "na") {
                embed.setTitle(q1)
            }
            if(q2.toLowerCase() !== "na") {
                embed.setURL(q2)
            }
            if(q4.toLowerCase() !== "na") {
                embed.setThumbnail(q4)
            }
            if(q3.toLowerCase() !== "na") {
                embed.setColor(q3)
            }
            if(q6.toLowerCase() !== "na") {
                embed.setDescription(`> Script Language: ${qH}\n> Want to credits? ${q7}\n> PRICE: USD$${q6}`)
            }
            if(q9.toLowerCase() !=="na") {
                embed.addField("Product Information:", q9)
            }

            if(q5.toLowerCase() !== "na") {
                embed.setImage(`Gallery Link:`, q5)
            }

            embed.setFooter("Created By: Astra Development // Astra#2100")
    
            embed.setTimestamp()
            let daChannel = message.guild.channels.cache.get(ansChannel);
            if(!daChannel) return channy.send(`Channel ID supplied can't be found.`).then(msg => msg.delete({timeout: 5000})).catch(console.error);
            daChannel.send(embed).catch(console.error);
            channy.send(`Created! This channel will delete in 10 seconds.`)
            setTimeout(async () => {
                channy.delete().catch(console.error);
            }, 10000);
        }
    }    
}