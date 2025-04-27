require('dotenv').config();
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');
const commandHandler = require('./handlers/commandHandler');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

eventHandler(client);
commandHandler(client);

client.login(process.env.DISCORD_TOKEN);
