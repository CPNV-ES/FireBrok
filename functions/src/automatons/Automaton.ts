export interface Automaton {
  name: String
  description: String
}

export const Rules = {
  name: {
    presence: true,
    length: {
      minimum: 2,
      maximum: 60
    }
  },
  description: {
    length: {
      maximum: 400
    }
  }
}