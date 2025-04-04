/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const MedicineCard = (props) => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [url, setURL] = useState(null);

  useEffect(() => {
    firebase.getImageURL(props.imageURL).then((url) => setURL(url));
  }, [firebase, props.imageURL]);

  return (
    <div className=" max-w-sm bg-white border border-gray-200 rounded-lg shadow-md h-full d-flex justify-content-between align-items-center flex-column">
      <a href="#" className="d-flex justify-content-center align-items-center">
        <img className="p-1 rounded-t-lg" src={url} alt="product image" />
      </a>
      <div className="px-4 pb-3">
        <h5 className="text-xl font-semibold tracking-tight text-black-900 ">{props.name}</h5>
        <div className="flex items-center justify-center">
          <span className="text-2xl font-bold text-black-900 me-3">₹{props.price}</span>
          <button
            onClick={(e) => navigate(props.link)}
            className="text-white bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
