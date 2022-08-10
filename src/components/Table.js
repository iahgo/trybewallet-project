import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((obj) => (
              <tr key={ obj.id }>
                <td>{obj.description}</td>
                <td>{obj.tag}</td>
                <td>{obj.method}</td>
                <td>{(obj.value * 1).toFixed(2)}</td>
                <td>{obj.exchangeRates[obj.currency].name}</td>
                <td>{(obj.exchangeRates[obj.currency].ask * 1).toFixed(2)}</td>
                <td>{(obj.exchangeRates[obj.currency].ask * obj.value).toFixed(2)}</td>
                <td>Real</td>
                <td>Editar</td>
              </tr>))}
          </tbody>
        </table>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps)(Table);
