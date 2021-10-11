import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense } from '../actions';

const tableHeader = ['Valor convertido', 'Descrição', 'Tag', 'Método de pagamento', 'Valor',
  'Moeda', 'Câmbio utilizado','Excluir'];

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
          <thead className="hidden md:table-header-group">
            <tr className="justify-around h-16">
              { tableHeader.map((item, index) => <th key={ index }>{ item }</th>)}
            </tr>
          </thead>
          <tbody>
            {
              expenses
                .map(
                  ({ description, tag, method, value, currency, exchangeRates, id }, i) => (
                    <tr
                      className={ `${i % 2 === 0 ? 'bg-gray-100' : 'bg-blue-200' } flex flex-col
                        w-screen items-center md:table-row md:h-12`}
                      key={ id }>
                      <td className="text-3xl font-bold mt-4 mb-0 pb-0 md:text-base
                        md:text-center md:w-1/12">
                        {
                          (exchangeRates[currency].ask * value )
                            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                        }
                      </td>
                      <td className="text-sm pt-0 mt-0 md:w-2/6 md:text-center md:w-3/12">
                        { description }
                      </td>
                      <td className="mb-4 font-bold text-sm bg-yellow-100 p-1 rounded
                        border-1 border-black border-solid shadow-md md:shadow-none 
                        md:bg-transparent md:font-normal">
                        { tag }
                      </td>
                      <td className="flex justify-between w-2/3 md:table-cell md:text-center
                        md:w-2/12">
                        <span className="font-bold md:hidden">
                          Method:
                        </span>
                        { method }
                      </td>
                      <td className="flex justify-between w-2/3 md:table-cell md:text-center
                        md:w-1/12">
                        <span className="font-bold md:hidden">
                          Value:
                        </span>
                        { value }
                      </td>
                      <td className="flex justify-between w-2/3 md:table-cell md:text-center
                        md:w-2/12">
                        <span className="font-bold md:hidden">Currency:</span>
                        { exchangeRates[currency].name.split('/')[0] }
                      </td>
                      <td className="flex justify-between w-2/3 mb-4 md:table-cell
                        md:text-center md:w-2/12">
                        <span className="font-bold md:hidden">Exchange Rate:</span>
                        { Math.round(exchangeRates[currency].ask * 100) / 100 }
                      </td>
                      <td className="md:w-3/12 md:text-center">
                        <button
                          className="bg-red-400 border-2 border-red-900 rounded p-1 mb-2 text-red-900
                            font-bold md:text-center md:mb-0"
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
          </tbody>
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
