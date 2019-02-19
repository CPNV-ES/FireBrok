// Load firebase functions sdk
const functions = require('firebase-functions')

// Declate cors middleware
const cors = require('cors')({ origin: true})

// Load functions
const createAutomaton = require('./src/automatons/create')
const newUser = require('./newUser')

/**
 * USERS FUNCTIONS
 */
 exports.newUser = newUser

/**
 * AUTOMATON FUNCTIONS
 */
exports.create_automaton = functions
  .region('europe-west1')
  .https
  .onCall(createAutomaton)
