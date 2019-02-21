import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import { Automaton, Rules } from './Automaton'
import { CallableContext } from 'firebase-functions/lib/providers/https';

import { validate } from 'validate.js'

/**
 * createAutomaton
 *
 * Creates a new automaton in the databse, and generates authentication key for the automaton
 * @author Bastien Nicoud
 */
export function createAutomaton (data: Automaton, context: CallableContext) {
  // Check authentication
  if (context.auth === undefined) {
    throw new functions.https.HttpsError('unauthenticated', 'You must be authenticated to call the create_automaton function.')
  }
  // Validate datas
  const errors = validate(data, Rules, { format: 'flat'}) || false
  if (errors) {
    throw new functions.https.HttpsError('failed-precondition', errors)
  }
  // Add to db
  return admin
    .firestore()
    .collection('automatons')
    .add({
      ...data,
      connected: false,
      created_at: admin.firestore.Timestamp.fromDate(new Date()),
      updated_at: admin.firestore.Timestamp.fromDate(new Date())
    })
    .then(ref => {
      return {
        automatonId: ref.id
      }
    })
    .catch(e => {
      throw new functions.https.HttpsError('unavailable', 'failed to create the automaton in database')
    })
}