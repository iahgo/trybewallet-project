// Esse reducer será responsável por tratar as informações da pessoa usuária
import * as actionsTypes from '../actions/actionsTypes';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case actionsTypes.SAVE_EMAIL:
    return {
      ...state,
      email: action.payload,
    };

  default:
    return state;
  }
};

export default user;
