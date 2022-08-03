import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    const { moeda, email } = this.props;

    return (
      <>
        <div>
          TrybeWallet
        </div>
        <Header email={ email } />
        {Object.values(moeda).map((e) => (
          <div key={ e.name }>
            <h5>
              {e.name}
              : R$
              {e.low}
            </h5>
          </div>
        ))}
        {/* {console.log(Object.values(moeda))} */}
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
