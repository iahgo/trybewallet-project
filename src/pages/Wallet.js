import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    const { moeda, email } = this.props;

    return (
      <>
        <Header email={ email } />
        <WalletForm moeda={ moeda } />
        <Table />
      </>

    );
  }
}

const mapStateToProps = (state) => ({
  moeda: state.wallet.currencies,
  email: state.user.email,
});

Wallet.propTypes = {
  moeda: PropTypes.arrayOf(Object).isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
