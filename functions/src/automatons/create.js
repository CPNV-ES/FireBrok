const admin = require('firebase-admin')

/**
 * createAutomaton
 *
 * Creates a new automaton in the databse, and generates authentication key for the automaton
 * @author Bastien Nicoud
 */
exports.default = (data, context) => {
  console.log('create_automaton CALLED')
  // Check authentication
  // Validates the form
  // Add the element to the db
  // Return success
  admin
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
      throw new functions.https.HttpsError('failed to create the automaton')
    })
}