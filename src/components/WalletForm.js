import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { adicionarGastos, getCurrencies } from '../redux/actions';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      currency: 'USD',
      method: 'dinheiro',
      tag: 'alimentacao',
      description: '',
      exchangeRates: '',
      total: 0,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  clickGastos = async () => {
    const { addGastos, expenses } = this.props;
    const { id, total, value } = this.state;
    await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        this.setState(
          {
            exchangeRates: data,
            total: (parseInt(total, 10) + parseInt(value, 10)),
          },
        );
      });
    addGastos(this.state);
    this.setState(
      {
        id: id + 1,
        total: expenses.reduce((acc, curr) => (
          acc + (curr.exchangeRates[curr.currency].ask) * curr.value), 0).toFixed(2),
        value: '',
        description: '',
      },
    );
  }

  render() {
    const { moeda } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    return (
      <div id="inputs">
        <form>
          <p>
            Id:
            {' '}
            {id}
          </p>
          <label htmlFor="valor">
            Valor
            <input
              type="number"
              data-testid="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="moeda de pagamento">
            Moeda de pagamento
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {moeda.map((e) => (
                <option key={ e } value={ e }>
                  {e}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="metodo de pagamento">
            Metodo de Pagamento
            <select
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }

            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Tag
            <select
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <label htmlFor="descrição">
            Descrição
            <input
              type="text"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }

            />
          </label>

          <button
            type="button"
            onClick={ this.clickGastos }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addGastos:
  (payload) => dispatch(adicionarGastos(payload)),

  moedas: () => dispatch(getCurrencies()),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});
WalletForm.propTypes = {
  moeda: PropTypes.arrayOf(Object).isRequired,
  addGastos: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
