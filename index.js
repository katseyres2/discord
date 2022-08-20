const fs = require("fs");
const { Client, Collection, Intents, ClientUser, GatewayIntentBits } = require("discord.js");
// go to guild advanced settings, enable developper mode
// right click on the guild icon on the left menu and copy ID
// right click on the bot icon on the right menu and copy ID
const { token, clientId, guildId } = require("./config.json");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const client = new Client({intents: [
    // Intents.FLAGS.GUILDS,
    // Intents.FLAGS.GUILD_MESSAGES,
    // Intents.FLAGS.DIRECT_MESSAGES,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
]});

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
client.commands = new Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
    console.log(`${command.data.name} charged`);
}

const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    
    event.once
        ? client.once(event.name, (...args) => event.execute(...args))
        : client.on(event.name, (...args) => event.execute(...args));
    
    console.log(`${event.name} charged`);
}

// client.on("interactionCreate", (interaction) => {
//     console.log("interaction !");
//     interaction.options.getUser("mention");
//     interaction.
// })

client.on('guildMemberAdd', (member) => {
    console.log("new member");
});

client.login(token);