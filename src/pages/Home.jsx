import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import MedicineCard from "../components/MedicineCard";

const HomePage = () => {
  const firebase = useFirebase();

  const [medicines, setmedicines] = useState([]);

  useEffect(() => {
    firebase.listAllmedicines().then((medicines) => setmedicines(medicines.docs));
  }, [firebase, medicines]);

  return (
    <div className="container mt-5">
      <div className="d-flex row">
        {medicines.map((medicine, index) => (
          <div className="col-3 mb-4" key={index}>
            <MedicineCard
              link={`/medicine/view/${medicine.id}`}
              key={medicine.id}
              id={medicine.id}
              {...medicine.data()}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
