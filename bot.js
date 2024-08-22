const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// Create an instance of express
const app = express();

// Hardcoded token and URL
const token = '7211458319:AAE4alBwS2Sf5CDBj-uKpAk9zwk0bBDMcQc';
const webhookUrl = 'https://tele-4.onrender.com/';

// Initialize the bot
const bot = new TelegramBot(token);
bot.setWebHook(`${webhookUrl}/bot${token}`);

// Middleware to parse JSON
app.use(express.json());

// This endpoint will be called by Telegram when a new message arrives
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

let waitingUsers = [];
let activeChats = {};

// Handle the /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome to the anonymous chat bot! Type /join to start chatting with a random user.');
});

// Handle the /join command
bot.onText(/\/join/, (msg) => {
  const chatId = msg.chat.id;

  if (activeChats[chatId]) {
    bot.sendMessage(chatId, 'You are already in a chat!');
    return;
  }

  if (waitingUsers.length > 0) {
    const partnerId = waitingUsers.pop();

    // Establish chat connection
    activeChats[chatId] = partnerId;
    activeChats[partnerId] = chatId;

    bot.sendMessage(chatId, 'You are now connected with a random user. Start chatting!');
    bot.sendMessage(partnerId, 'You are now connected with a random user. Start chatting!');
  } else {
    waitingUsers.push(chatId);
    bot.sendMessage(chatId, 'Waiting for a user to connect with...');
  }
});

// Handle the /end command
bot.onText(/\/end/, (msg) => {
  const chatId = msg.chat.id;

  if (!activeChats[chatId]) {
    bot.sendMessage(chatId, 'You are not currently in a chat.');
    return;
  }

  const partnerId = activeChats[chatId];
  bot.sendMessage(chatId, 'You have left the chat.');
  bot.sendMessage(partnerId, 'The other user has left the chat.');

  delete activeChats[chatId];
  delete activeChats[partnerId];
});

// Handle incoming messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // Ignore system messages like /start, /join, /end
  if (msg.text.startsWith('/')) return;

  const partnerId = activeChats[chatId];
  if (partnerId) {
    bot.sendMessage(partnerId, msg.text);
  } else {
    bot.sendMessage(chatId, 'You are not currently in a chat. Type /join to start.');
  }
});

// Start the express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
