import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import MedicineCard from "../components/MedicineCard";

const OrdersPage = () => {
  const firebase = useFirebase();
  const [medicines, setmedicines] = useState([]);

  useEffect(() => {
    if (firebase.isLoggedIn)
      firebase
        .fetchMymedicines(firebase.user.uid)
        ?.then((medicines) => setmedicines(medicines.docs));
  }, [firebase]);

  console.log(medicines);

  if (!firebase.isLoggedIn) return <h1>Please log in</h1>;

  return (
    <div className="container mt-5">
      <div className="d-flex row">
        {medicines.map((book) => (
          <div className="col-3 mb-4">
            <MedicineCard
              link={`/medicine/orders/${book.id}`}
              key={book.id}
              id={book.id}
              {...book.data()}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
