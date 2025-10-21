import "../App.css";
import Button from "./Button";

const ExpenseList = ({ expenses, onUndo }) => {
  const formatDateDDMMYYYY = (isoDate) => {
    const [year, month, day] = isoDate.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <ul>
      {expenses.map((expense) => (
        <li key={expense.id}>
          {`(${expense.userName}) ${formatDateDDMMYYYY(
            expense.expenseDate
          )} :: R$ ${expense.value} - ${expense.description}`}{" "}
          <Button onClick={() => onUndo(expense.id)}>❌</Button>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
