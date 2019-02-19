// Load firebase functions sdk
const functions = require('firebase-functions')

// Load functions
const newAutomaton = require('./src/automatons/new')
const newUser = require('./newUser')

/**
 * USERS FUNCTIONS
 */
 exports.newUser = newUser

/**
 * AUTOMATON FUNCTIONS
 */
exports.newAutomaton = functions
  .region('europe-west1')
  .https
  .onCall(newAutomaton)
