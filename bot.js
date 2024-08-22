const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
require('dotenv').config();

const app = express();
const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token);
bot.setWebHook(`${process.env.RENDER_EXTERNAL_URL}/bot${token}`);

app.use(express.json());

// This endpoint will be called by Telegram when a new message arrives
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

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

// Start express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
