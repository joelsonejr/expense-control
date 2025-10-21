import UserTotal from "./UserTotal";

const TotalDisplay = ({ values }) => {
  // const total = values?.reduce((sum, item) => sum + Number(item.value), 0) ?? 0;

  const totalsArray = Object.values(
    values.reduce((acc, expense) => {
      const value = Number(expense.value);

      //creating an object that uses userIds as keys
      //verifying if the key already exists
      if (!acc[expense.userId]) {
        acc[expense.userId] = {
          userId: expense.userId,
          userName: expense.userName,
          total: 0,
        };
      }
      acc[expense.userId].total += value;
      return acc;
    }, {})
  );

  return (
    <div>
      {totalsArray.map((total) => (
        <UserTotal total={total} key={total.userId} />
      ))}
    </div>
  );
};

export default TotalDisplay;
