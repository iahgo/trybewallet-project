// Coloque aqui suas actions
import * as actionsTypes from './actionsTypes';

export const usuario = (payload) => ({
  type: actionsTypes.SAVE_EMAIL,
  payload,
});

export const setMoedas = (array) => ({
  type: actionsTypes.GET_CURRENCIES,
  payload: array,
});

export function getCurrencies() {
  return (dispatch) => (
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const array = Object.keys(data).filter((nome) => nome !== 'USDT');
        console.log(array);
        dispatch(setMoedas(array));
      })
  );
}

export const setGastos = (payload) => ({
  type: actionsTypes.ADD_EXPENSES,
  payload,
});

export const arraya = [];

export function adicionarGastos(payload) {
  const { id, description, value, tag, currency, exchangeRates, method } = payload;
  return (dispatch) => {
    // console.log(Object.keys(arraya)[0].id);
    arraya.push({ id, description, value, tag, currency, exchangeRates, method });
    // arraya.push(parseInt(payload, 10));
    console.log(payload);
    console.log(id);
    console.log(description);
    console.log(arraya);
    dispatch(setGastos(
      { id, value, description, currency, method, tag, exchangeRates },
    ));
  };
}

export const somaTotal = (total) => ({
  type: actionsTypes.SOMA_TOTAL,
  total,
});

export const deleteExpense = (obj) => ({
  type: actionsTypes.DELETE_EXPENSE,
  expenseToDelete: obj,
});
