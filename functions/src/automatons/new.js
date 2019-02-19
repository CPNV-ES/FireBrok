/**
 * newAutomaton
 *
 * Creates a new automaton in the databse, and generates authentication key for the automaton
 * @author Bastien Nicoud
 */
exports.default = (data, context) => {
  console.info("newAutomaton function called")
  return {
    message: `Function corectly called with text : ${data.text}`
  }
}