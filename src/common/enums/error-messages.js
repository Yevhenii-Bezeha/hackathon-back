const ErrorMessages = {
  COMMON_ERROR: 'Server error occured.',
  Pokemons: {
    EDITING_ERROR: 'Pokemon was not edited.',
    ADDING_ERROR: 'Pokemon was not added.',
    NOT_FOUND: (name) => `Pokemon with name ${name} not found.`,
  },
  Comments: {
    EDITING_ERROR: 'Comment was not edited.',
    ADDING_ERROR: 'Comment was not added.',
    NOT_FOUND: (id) => `Comment with ID ${id} not found.`,
  },
  Users: {
    WRONG_EMAIL: 'Wrong email was provided.',
    WRONG_PASSWORD: 'Wrong password was provided.',
    DUBLICATING_EMAIL: 'User with such email already exists.',
  },
};

export default ErrorMessages;
