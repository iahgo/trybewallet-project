import { SAVE_EMAIL, DELETE_TAG, EDIT_TAG, EFETIVE_EDIT, FINISH_EDIT,
  SAVE_CURRENCIES, SAVE_EXPENSES } from './actionsTypes';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

export const actionDelete = (id) => ({
  type: DELETE_TAG,
  payload: id,
});

export const actionEditInit = (id) => ({
  type: EDIT_TAG,
  payload: id,
});

export const actionEfetiveEdit = (object) => ({
  type: EFETIVE_EDIT,
  payload: object,
});

export const actionUpdateFinish = () => ({
  type: FINISH_EDIT,
});

const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  payload: currencies.filter((currencie) => currencie !== 'USDT'),
});

const saveExpenses = (data, state) => ({
  type: SAVE_EXPENSES,
  payload: {
    exchangeRates: data,
    ...state,
  },
});

export const fetchApiExpenses = (state) => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => {
      dispatch(saveExpenses(data, state));
    });
};

export const fetchApiCurrencies = () => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => {
      const values = Object.keys(data);
      dispatch(saveCurrencies(values));
    });
};
