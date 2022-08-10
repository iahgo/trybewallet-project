import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    console.log(expenses);
    return (
      <div id="header">
        Header
        <div>
          <span data-testid="email-field">{ email }</span>
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
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
}.isRequired;

export default connect(mapStateToProps)(Header);
