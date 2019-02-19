// Load firebase functions sdk
const functions = require('firebase-functions')

// Load functions
const newAutomaton = require('./src/automatons/new')

/**
 * USERS FUNCTIONS
 */

/**
 * AUTOMATON FUNCTIONS
 */
exports.newAutomaton = functions
  .region('europe-west1')
  .https
  .onCall(newAutomaton)
