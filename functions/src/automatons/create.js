/**
 * createAutomaton
 *
 * Creates a new automaton in the databse, and generates authentication key for the automaton
 * @author Bastien Nicoud
 */
exports.default = (data, context) => {
  console.info("newAutomaton function called")
  console.info(data.name)
  return {
    message: `Function corectly called with text : ${data.name}`
  }
}