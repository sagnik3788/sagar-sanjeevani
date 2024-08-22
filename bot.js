const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

console.log(process.env.TELEGRAM_TOKEN)

// Replace with your token from BotFather
const token = process.env.TELEGRAM_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

let waitingUsers = [];
let activeChats = {};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome to the anonymous chat bot! Type /join to start chatting with a random user.');
});

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
