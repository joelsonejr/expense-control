import "./App.css";
import Form from "./components/Form";
import ExpenseList from "./components/ExpenseList";
import { useState } from "react";
import userList from "./data/userList";
import TotalDisplay from "./components/TotalDisplay";

function App() {
  const [userExpenses, setUserExpenses] = useState([]);

  const handleAddExpense = (newExpense) => {
    setUserExpenses((expenses) => [...expenses, newExpense]);
  };

  const resetExpenseList = (e) => {
    e.preventDefault();

    setUserExpenses([]);
  };

  const removeLastExpenseAddition = (id) => {
    let updatedList = userExpenses.filter((exp) => exp.id !== id);

    setUserExpenses(updatedList);
  };

  const isResetEnabled = userExpenses.length > 0;

  return (
    <div className="">
      <h1>Controle de Despesas</h1>
      <Form
        users={userList}
        onAddExpense={handleAddExpense}
        onResetExpenses={resetExpenseList}
        isResetEnabled={isResetEnabled}
      />
      <ExpenseList expenses={userExpenses} onUndo={removeLastExpenseAddition} />
      <TotalDisplay values={userExpenses} />
    </div>
  );
}

export default App;
