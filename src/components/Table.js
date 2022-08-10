import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deleteExpense as deleteAct,
  somaTotal as somaAct,
} from '../redux/actions';

class Table extends Component {
  handleClick = (obj) => {
    const { deleteExpense, expenses, somaTotal } = this.props;
    deleteExpense(obj);
    const newExpenses = expenses.filter((item) => item.id !== obj.id);
    const total = newExpenses.reduce((acc, curr) => (
      acc + (curr.exchangeRates[curr.currency].ask) * curr.value), 0).toFixed(2);
    somaTotal(total);
  }

  render() {
    const { expenses } = this.props;
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
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.handleClick(obj) }
                  >
                    Excluir
                  </button>
                </td>
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

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (obj) => dispatch(deleteAct(obj)),
  somaTotal: (total) => dispatch(somaAct(total)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  somaTotal: PropTypes.func,
  deleteExpense: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
