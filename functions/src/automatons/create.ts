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
  console.log('create_automaton CALLED !!!')
  // Check authentication
  // Validates the form
  // Add the element to the db
  // Return success
  return admin
    .firestore()
    .collection('automatons')
    .add(data)
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