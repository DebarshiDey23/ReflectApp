const OneSignal = require('onesignal-node');

// Initialize OneSignal client
const client = new OneSignal.Client({
  userAuthKey: process.env.ONESIGNAL_USER_AUTH_KEY,
  app: { appAuthKey: process.env.ONESIGNAL_APP_AUTH_KEY, appId: process.env.ONESIGNAL_APP_ID }
});

// Function to send notification
async function sendNotification(userIds, message) {
  const notification = {
    contents: { en: message },
    include_external_user_ids: userIds,
  };

  try {
    const response = await client.createNotification(notification);
    console.log('Notification sent successfully:', response);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

module.exports = {
  sendNotification,
};
