import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense } from '../actions';

const tableHeader = ['Descrição', 'Tag', 'Método de pagamento', 'Valor',
  'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão',
  'Editar/Excluir'];

class ExpenseTable extends React.Component {
  constructor() {
    super();

    this.deleteButton = this.deleteButton.bind(this);
  }

  deleteButton(id) {
    const { expenses, deleteExpense } = this.props;
    const filtered = expenses.filter((expense) => expense.id !== id);
    deleteExpense(filtered);
  }

  render() {
    const { expenses } = this.props;
    if (expenses.length === 0) return (
      <div className="text-center mt-2">
        Ainda não temos despesas registradas!
      </div>
    );
    return (
      <div>
        <table>
          <tr className="hidden">
            { tableHeader.map((item, index) => <th key={ index }>{ item }</th>)}
          </tr>
          {
            expenses
              .map(
                ({ description, tag, method, value, currency, exchangeRates, id }, i) => (
                  <tr
                    className={ `${i % 2 === 0 ? 'bg-gray-100' : 'bg-blue-200' } flex flex-col
                      w-screen items-center`}
                    key={ id }>
                    <td className="text-3xl font-bold mt-4 mb-0 pb-0">
                      {
                        (exchangeRates[currency].ask * value )
                          .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                      }
                    </td>
                    <td className="text-sm pt-0 mt-0">{ description }</td>
                    <td className="mb-4 font-bold text-sm bg-yellow-100 p-1 rounded border-1 border-black
                      border-solid shadow-md">
                      { tag }
                    </td>
                    <td className="flex justify-between w-2/3">
                      <span className="font-bold md:hidden">
                        Method:
                      </span>
                      { method }
                    </td>
                    <td className="flex justify-between w-2/3">
                      <span className="font-bold md:hidden">
                        Value:
                      </span>
                      { value }
                    </td>
                    <td className="flex justify-between w-2/3">
                      <span className="font-bold md:hidden">Currency:</span>
                      { exchangeRates[currency].name.split('/')[0] }
                    </td>
                    <td className="flex justify-between w-2/3 mb-4">
                      <span className="font-bold md:hidden">Exchange Rate:</span>
                      { Math.round(exchangeRates[currency].ask * 100) / 100 }
                    </td>
                    <td>
                      <button
                        className="bg-red-400 border-2 border-red-900 rounded p-1 mb-2 text-red-900
                          font-bold"
                        type="button"
                        onClick={ () => this.deleteButton(id) }
                        data-testid="delete-btn"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ),
              )
          }
        </table>
      </div>
    );
  }
}

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (payload) => dispatch(removeExpense(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
