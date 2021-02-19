const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require("././settings/config.json");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("message", async message =>{


    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(settings.config.prefix)) return;

    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(settings.config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);


})

const fs = require('fs');
fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err); 
	files.forEach(file => {
		const eventFunction = require(`./events/${file}`); 
		if (eventFunction.disabled) return; 

		const event = eventFunction.event || file.split('.')[0]; 
		const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client; 
		const once = eventFunction.once; 

		
		try {
			emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(...args)); 
		} catch (error) {
			console.error(error.stack); 
		}
	});
})

client.login(settings.config.token)