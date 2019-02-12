const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.newAutomaton = functions.region('europe-west1').https.onCall((data, context) => {
  console.info("newAutomaton function called")
  return {
    message: `Function corectly called with text : ${data.text}`
  }
})