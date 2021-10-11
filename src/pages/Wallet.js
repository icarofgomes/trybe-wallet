import React from 'react';
import { Header, ExpenseForm, ExpenseTable } from '../components';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ExpenseForm />
        <ExpenseTable />
      </div>
    );
  }
}

export default Wallet;
