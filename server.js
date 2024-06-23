const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://<your-project-id>.firebaseio.com'
});

const db = admin.firestore();
const app = express();
app.use(bodyParser.json());

const authenticateToken = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

app.get('/notifications', authenticateToken, async (req, res) => {
  try {
    const userRef = db.collection('users').doc(req.user.uid);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(userDoc.data().notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/respond', [
  check('notificationId').notEmpty(),
  check('response').notEmpty()
], authenticateToken, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { notificationId, response } = req.body;
  try {
    const userRef = db.collection('users').doc(req.user.uid);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const notifications = userDoc.data().notifications;
    const notificationIndex = notifications.findIndex(notification => notification.id === notificationId);

    if (notificationIndex === -1) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    notifications[notificationIndex].responded = true;

    await userRef.update({ notifications });

    // Save the user's response to a separate collection or handle it as needed
    await db.collection('responses').add({
      userId: req.user.uid,
      notificationId,
      response,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(200).json({ message: 'Response recorded' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
