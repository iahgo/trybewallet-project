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
        dispatch(setMoedas(data));
      })
  );
}
