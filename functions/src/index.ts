import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp(functions.config().firebase)

// Load functions
import { createAutomaton } from './automatons/create'

export const create_automaton = functions
  .region('europe-west1')
  .https
  .onCall(createAutomaton)
