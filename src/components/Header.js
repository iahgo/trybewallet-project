import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  calculaTot = () => {
    const { expenses } = this.props;
    const sum = expenses.reduce((acc, curr) => (
      acc + (curr.value * curr.exchangeRates[curr.currency].ask)), 0);
    return sum.toFixed(2);
  }

  render() {
    const { email, expenses } = this.props;
    // const { total } = this.state;
    // const total = 0;
    console.log(expenses);
    return (
      <div id="header">
        Header
        <div>
          {/* colocar uma logica para somar os values do estado  */}
          <span data-testid="email-field">{ email }</span>
          {/* <span data-testid="total-field">
            {
              expenses.map((obj) => {
                // id += 1;
                console.log(obj);
                total += parseFloat(obj.exchangeRates[obj.currency].ask * obj.value)
                  .toFixed(2);
                console.log(total);
                console.log(typeof total);
                console.log(parseFloat(total));
                console.log(typeof parseFloat(total));
                return parseFloat(total);
              })
            } */}
          {/* { this.calculaTot } */}
          {/* </span> */}
          <span data-testid="total-field">
            { expenses.reduce((acc, curr) => (
              acc + curr.value * curr.exchangeRates[curr.currency].ask
            ), 0).toFixed(2) }

          </span>
          <span data-testid="header-currency-field"> BRL</span>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  // total: PropTypes.number,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
}.isRequired;

export default connect(mapStateToProps)(Header);
