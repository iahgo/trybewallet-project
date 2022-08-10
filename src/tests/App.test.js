import React from 'react';
import './helpers/renderWith';
import './helpers/mockData';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux, renderWithRedux } from './helpers/renderWith';
import userEvent from '@testing-library/user-event';
import Table from '../components/Table';
import Wallet from '../pages/Wallet';
import WalletForm from '../components/WalletForm';
import mockData from './helpers/mockData';

describe('Verifica Login', () => {
  it('renderiza login e email', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-button');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  it('efetua login', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-button');
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(button);
    const emailField = await screen.findByTestId('email-field');
    const BRL = await screen.findByText('BRL');
    expect(emailField).toBeInTheDocument();
    expect(emailField.innerHTML).toBe('test@test.com');
    expect(BRL).toBeInTheDocument();
  });
});

describe('Verifica Table', () => {
  test('Verifica os textos da tabela', () => {
    renderWithRedux(<Table />);

    expect(screen.getByText(/Descrição/i)).toBeInTheDocument();
    expect(screen.getByText(/Tag/i)).toBeInTheDocument();
    expect(screen.getByText(/Método de pagamento/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Valor/i).length).toBe(2);
    expect(screen.getAllByText(/Moeda/i).length).toBe(2);
    expect(screen.getByText(/Câmbio utilizado/i)).toBeInTheDocument();
    expect(screen.getByText(/Valor convertido/i)).toBeInTheDocument();
    expect(screen.getByText(/Moeda de conversão/i)).toBeInTheDocument();
    expect(screen.getByText(/Editar/i)).toBeInTheDocument();
    expect(screen.getByText(/Excluir/i)).toBeInTheDocument();
  });
}); 

const expenses = {
  id: 0,
  value: 1,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: mockData,
}
const wallet = {
  currencies: Object.keys(mockData),
  expenses: [expenses],
};

describe('VerificaWalletForm',()=>{
  it('Verifica os textos do formulario ',()=>{
  renderWithRouterAndRedux(<Wallet/>)
  const value = screen.getByTestId('value-input');
  const currency = screen.getByTestId('currency-input');
  const method = screen.getByTestId('method-input');
  const tag = screen.getByTestId('tag-input');
  const description = screen.getByTestId('description-input');
  expect(value).toBeInTheDocument();
  expect(currency).toBeInTheDocument();
  expect(method).toBeInTheDocument();
  expect(tag).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  })
  it('Verifica o botão "Adicionar Despesa"', () => {
      renderWithRouterAndRedux(<Wallet />);
      const button = screen.getByRole( 'button', {name: /adicionar despesa/i });
      expect(button).toBeInTheDocument();
  });
  it('Verifica o botão "Excluir"', () => {
      renderWithRouterAndRedux(<Wallet />, { initialState: { wallet: wallet } });
      const button = screen.getByRole('button', {  name: /excluir/i});
      expect(button).toBeInTheDocument();
  });
  it('Verifica Deleta despesa ', () => {
      renderWithRouterAndRedux(<Wallet />, { initialState: { wallet: wallet } });
      const button = screen.getByRole('button', {  name: /excluir/i});
      userEvent.click(button);
  });

}) 