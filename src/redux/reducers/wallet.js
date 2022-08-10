// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária
import * as actionsTypes from '../actions/actionsTypes';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case actionsTypes.GET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };

  case actionsTypes.ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case actionsTypes.SOMA_TOTAL:
    return {
      ...state,
      total: action.total,
    };
  case actionsTypes.DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses
        .filter((item) => item.id !== action.expenseToDelete.id),
    };
  default:
    return state;
  }
};

export default wallet;
