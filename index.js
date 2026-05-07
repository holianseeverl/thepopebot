require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { handleMessage } = require('./src/messageHandler');

// Initialize Discord client with required intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

// Bot is ready
client.once('ready', () => {
  console.log(`✅ ThePopeBot is online as ${client.user.tag}`);
  client.user.setActivity('Blessing the chat', { type: 'WATCHING' });
});

// Handle incoming messages
client.on('messageCreate', async (message) => {
  // Ignore messages from bots
  if (message.author.bot) return;

  try {
    await handleMessage(client, message);
  } catch (error) {
    console.error('Error handling message:', error);
    message.reply('Something went wrong. Please try again.');
  }
});

// Handle errors gracefully
client.on('error', (error) => {
  console.error('Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

// Login with bot token
client.login(process.env.DISCORD_TOKEN);
