import { useEffect, useRef, useState } from "react";
import Button from "./Button";

const Form = ({ users, onAddExpense, onResetExpenses, isResetEnabled }) => {
  const today = new Date();
  const localDate = today.toLocaleDateString("en-CA");

  const [expenseDate, setExpenseDate] = useState(localDate);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [user, setUser] = useState(null);

  //automatic focus on this field after submit 1 of 3
  const userSelectRef = useRef(null);
  const dateInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  // focus the user select on initial render
  useEffect(() => {
    userSelectRef.current?.focus();
  }, []);

  const handleSelectUser = (e) => {
    const currentUser = users.find((u) => u.id === Number(e.target.value));

    setUser(currentUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedDescription = description.trim();
    const trimmedValue = Number(value.trim());

    if (
      !trimmedDescription ||
      isNaN(trimmedValue) ||
      trimmedValue <= 0 ||
      !user
    )
      return;

    const newExpense = {
      id: Date.now(),
      expenseDate: expenseDate,
      userId: user.id,
      userName: user.name,
      description: trimmedDescription,
      value: trimmedValue,
    };

    onAddExpense(newExpense);

    setDescription("");
    setValue("");
    setExpenseDate(localDate);

    //automatic focus on this field after submit 2 of 3
    dateInputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        ref={userSelectRef}
        value={user?.id ?? ""}
        onChange={(e) => handleSelectUser(e)}
      >
        <option value="" disabled>
          Selecione um usuário
        </option>
        {users.map((user) => (
          <option value={user.id} key={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <input
        // automatic focus on this field after submit 3 of 3
        ref={dateInputRef}
        type="date"
        value={expenseDate}
        onChange={(e) => setExpenseDate(e.target.value)}
      />
      <input
        // automatic focus on this field after submit 3 of 3
        ref={descriptionInputRef}
        type="text"
        placeholder="Descreva a despesa"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        step={0.01}
        placeholder="Valor da despesa"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="submit">Adicionar Despesas</Button>
      {isResetEnabled && (
        <Button type="button" onClick={onResetExpenses}>
          Limpar lista
        </Button>
      )}
    </form>
  );
};

export default Form;
