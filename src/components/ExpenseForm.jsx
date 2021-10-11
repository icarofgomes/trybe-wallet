import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, fetchRates } from '../actions';
import { InputField, SelectField } from '.';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};
const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tagArray = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class ExpenseForm extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
    this.handleChange = this.handleChange.bind(this);
    this.updateRates = this.updateRates.bind(this);
  }

  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  updateRates() {
    const { fetchRate, expenses } = this.props;
    const id = expenses.length;
    fetchRate(this.state, id);
    this.setState(INITIAL_STATE);
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    if (!currencies) return <p>Loading...</p>;
    return (
      <form className="flex flex-col bg-blue-900 text-white p-2 md:flex-row md:justify-around
        md:flex-wrap">
        <InputField
          field="value"
          type="number"
          value={ value }
          handleChange={ this.handleChange }
        />
        <InputField
          field="description"
          type="text"
          value={ description }
          handleChange={ this.handleChange } 
        />
        <SelectField
          field="currency"
          value={ currency }
          handleChange={ this.handleChange }
          array={ currencies }
        />
        <SelectField
          field="method"
          value={ method }
          handleChange={ this.handleChange }
          array={ methods }
        />
        <SelectField
          field="tag"
          value={ tag }
          handleChange={ this.handleChange }
          array={ tagArray }
        />
        <button
          className="my-4 w-3/6 bg-white mx-auto rounded font-bold hover:border-blue-600
            border-2 text-black md:my-2 md:w-1/6"
          type="button"
          onClick={ this.updateRates }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  fetchCurrency: PropTypes.func.isRequired,
  fetchRate: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(fetchCurrencies()),
  fetchRate: (state, id) => dispatch(fetchRates(state, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
