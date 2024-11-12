// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária
import { DELETE_TAG, EDIT_TAG, EFETIVE_EDIT, FINISH_EDIT,
  SAVE_CURRENCIES, SAVE_EXPENSES } from '../actions/actionsTypes';

const inittialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  update: 0,
};

const wallet = (state = inittialState, action) => {
  const newExpenses = state.expenses;
  console.log(action);
  switch (action.type) {
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_TAG:

    return {
      ...state,
      expenses: newExpenses.filter((expense) => expense.id !== action.payload),
    };

  case EDIT_TAG:
    return {
      ...state,
      editor: true,
      update: 0,
      idToEdit: action.payload,
    };
  case EFETIVE_EDIT:
    return {
      ...state,
      expenses: action.payload,
      editor: false,
    };
  case FINISH_EDIT:
    return {
      ...state,
      update: 1,
    };
  default: return state;
  }
};

export default wallet;
