const cron = require('node-cron');
const fetchPrompts = require('./scripts/fetchprompts'); // Adjust the path as needed

const fetchPromptsCron = () => {
  cron.schedule('0 0 * * *', () => { // Schedule to run every day at midnight
    console.log('Fetching prompts...');
    fetchPrompts();
  });
};

module.exports = fetchPromptsCron;