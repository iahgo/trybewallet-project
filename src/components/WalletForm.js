import React, { Component } from 'react';

export default class WalletForm extends Component {
  render() {
    const { moeda } = this.props;

    return (
      <div>
        <div id="inpus">
          <form>
            <label htmlFor="Valor">
              Valor
              <input
                type="number"
                data-testid="value-input"
                name="valor"
              />
            </label>

            <label htmlFor="moeda de pagamento">
              Moeda de pagamento
              <select data-testid="currency-input" name="moeda">
                <option value="USD">USD</option>
                <option value="BTC">BTC</option>
                <option value="DOGE">DOGE</option>
              </select>
            </label>

            <label htmlFor="metodo de pagamento">
              Metodo de Pagamento
              <select data-testid="method-input" name="metodo">
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>
            </label>

            <label htmlFor="tag">
              Tag
              <select data-testid="tag-input" name="tag">
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
                name="descricao"
              />
            </label>

            <button
              type="submit"
            >
              Adicionar despesa
            </button>
          </form>
        </div>
        {Object.values(moeda).map((e) => (
          <div key={ e.name }>
            <h5>
              {e.name}
              : R$
              {e.low}
            </h5>
          </div>
        ))}
      </div>
    );
  }
}
