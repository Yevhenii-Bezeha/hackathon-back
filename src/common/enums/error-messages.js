const ErrorMessages = {
  COMMON_ERROR: 'Server error occured.',
  WRONG_ID_FORMAT: 'Wrong ID format.',
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
    NO_TOKEN: 'A token was not provided.',
    WRONG_TOKEN: 'The wrong token was provided.',
    WRONG_PERMISSION: 'User has no permission.',
    WRONG_EMAIL: 'Wrong email was provided.',
    WRONG_PASSWORD: 'Wrong password was provided.',
    DUBLICATING_EMAIL: 'User with such email already exists.',
  },
};

export default ErrorMessages;
