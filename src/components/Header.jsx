import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: 'BRL',
    };
    this.expensesSum = this.expensesSum.bind(this);
  }

  expensesSum() {
    const { expenses } = this.props;
    if (expenses.length === 0) return 0;
    return expenses
      .map(({ value, currency, exchangeRates }) => exchangeRates[currency].ask * value)
      .reduce((acc, curr) => acc + curr);
  }

  render() {
    const { emailInput } = this.props;
    const expenseValue = this.expensesSum();
    const { currency } = this.state;
    return (
      <div className="bg-blue-900 text-white p-2 rounded">
        <h1 className="text-center text-2xl font-bold">TRYBE WALLET</h1>
        <hr/>
        <div className="text-center mb-2" data-testid="email-field">{ emailInput }</div>
        <div className="text-lg" data-testid="total-field">
          <span className="mr-1">Expenses:</span>
          { expenseValue.toFixed(2) }
          <span className="ml-1" data-testid="header-currency-field">
            { currency }
          </span>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  emailInput: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  emailInput: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
