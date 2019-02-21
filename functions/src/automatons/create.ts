import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import { Automaton } from './Automaton'
import { CallableContext } from 'firebase-functions/lib/providers/https';

/**
 * createAutomaton
 *
 * Creates a new automaton in the databse, and generates authentication key for the automaton
 * @author Bastien Nicoud
 */
export function createAutomaton (data: Automaton, context: CallableContext) {
  if (context.auth === undefined) {
    throw new functions.https.HttpsError('unauthenticated', 'You must be authenticated to call the create_automaton function.')
  }
  console.log(context.auth)
  console.log('create_automaton CALLED !!!')
  // Check authentication
  // Validates the form
  // Add the element to the db
  // Return success
  return admin
    .firestore()
    .collection('automatons')
    .add({
      ...data,
      created_at: admin.firestore.Timestamp.fromDate(new Date()),
      updated_at: admin.firestore.Timestamp.fromDate(new Date())
    })
    .then(ref => {
      console.log(ref)
      return {
        automatonId: ref.id
      }
    })
    .catch(e => {
      console.error(e)
      throw new functions.https.HttpsError('unavailable', 'failed to create the automaton in database')
    })
}