import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  isValid() {
    const NUMBER = 5;
    const { email, password } = this.state;
    const emailValidator = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i);
    const passwordValidator = password.length > NUMBER;
    if (emailValidator && passwordValidator) return true;
  }

  handleClick() {
    const { dispatchSetEmail } = this.props;
    const { email } = this.state;
    this.setState({ redirect: true });
    dispatchSetEmail(email);
  }

  render() {
    const { email, password, redirect } = this.state;
    if (redirect) return <Redirect to="/trybe-wallet/carteira" />;
    return (
      <div className=" flex w-screen h-screen justify-center bg-blue-900">
        <div className="flex flex-col justify-center">
          <h1 className="mb-8 mx-auto text-white font-bold text-3xl">TrybeWallet</h1>
          <div className="flex flex-col">
            <div className="text-white font-bold text-lg">Email</div>
            <div>
              <label htmlFor="input-email">
                <input
                  className="rounded-sm"
                  type="email"
                  name="email"
                  id="input-email"
                  data-testid="email-input"
                  onChange={ this.handleChange }
                  value={ email }
                />
              </label>
            </div>
          </div>
          <div>
            <div className="text-white font-bold text-lg">Senha</div>
            <div>
              <label htmlFor="input-password">
              <input
                className="rounded-sm"
                type="text"
                name="password"
                id="input-password"
                data-testid="password-input"
                onChange={ this.handleChange }
                value={ password }
              />
            </label>
            </div>
          </div>
          <button
            className="my-4 w-2/6 bg-white mx-auto rounded font-bold hover:border-blue-600 border-2"
            type="button"
            disabled={ !this.isValid() }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatchSetEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetEmail: (email) => dispatch(setEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
