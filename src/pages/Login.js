import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies, usuario } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      isButtonDisable: true,
      // isButtonDisable: false,
    };
  }

  verifyButton = () => {
    const { email, senha } = this.state;
    const verifyEmail = (/\S+@\S+\.\S+/).test(email);
    const minimo = 5;
    if (senha.length >= minimo && verifyEmail) {
      console.log('senha valido ');
      return true;
    }
    console.log('senha não valido');
    return false;
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
    this.setState({ isButtonDisable: !this.verifyButton(target) });
  }

  handleClick = () => {
    const { history, moedas, dispatchEmail } = this.props;
    const { email } = this.state;
    dispatchEmail(email);
    moedas();
    history.push('/carteira');
  }

  render() {
    const { email, senha, isButtonDisable } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Email
            <input
              type="email"
              data-testid="email-input"
              placeholder="Email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="senha">
            Senha
            <input
              type="password"
              data-testid="password-input"
              placeholder="Senha"
              name="senha"
              value={ senha }
              onChange={ this.handleChange }

            />
          </label>
          <button
            data-testid="login-submit-button"
            type="submit"
            onClick={ this.handleClick }
            disabled={ isButtonDisable }
          >
            Entrar
          </button>
        </form>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  moedas: () => dispatch(getCurrencies()),
  dispatchEmail: (payload) => dispatch(usuario(payload)),
});

Login.propTypes = {
  dispatchEmail: PropTypes.func.isRequired,
  moedas: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
