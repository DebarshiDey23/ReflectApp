const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.sendRandomPrompt =
    functions.pubsub.schedule("every 1 hours").onRun(async (context) => {
      try {
        const usersSnapshot = await db.collection("users").get();
        const promptsSnapshot = await db.collection("prompts").get();

        if (promptsSnapshot.empty) {
          console.log("No prompts found.");
          return null;
        }

        const prompts = promptsSnapshot.docs.map((doc) => doc.data());

        const batch = db.batch();

        usersSnapshot.forEach((userDoc) => {
          const randomPrompt =
        prompts[Math.floor(Math.random() * prompts.length)];
          const userRef = userDoc.ref;
          const notification = {
            prompt: randomPrompt.content,
            responded: false,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
          };

          batch.update(userRef, {
            notifications:
                    admin.firestore.FieldValue.arrayUnion(notification),
          });
        });

        await batch.commit();
        console.log("Prompts sent successfully.");
      } catch (error) {
        console.error("Error sending prompts:", error);
      }
      return null;
    });
