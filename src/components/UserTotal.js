const UserTotal = ({ total }) => {
  return (
    <div>
      <h3>{total.userName}</h3>
      <p>Total Gasto R$ {total.total}</p>
    </div>
  );
};

export default UserTotal;
