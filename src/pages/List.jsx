import React, { useState } from "react";

import { useFirebase } from "../context/Firebase";

const ListingPage = () => {
  const firebase = useFirebase();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discription, setDiscription] = useState("");
  const [manufacutreDate, setManufacrureDate] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [manufactureName, setManufactureName] = useState("");
  const [coverPic, setCoverPic] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.handleCreateNewListing(
      name,
      price,
      discription,
      manufacutreDate,
      expireDate,
      manufactureName,
      coverPic
    );

    setName("");
    setPrice("");
    setCoverPic("");
    setDiscription("");
    setExpireDate("");
    setManufacrureDate("");
    setManufactureName("");
  };

  console.log(coverPic);
  return (
    <div className="container mt-3 mb-5">
      <form class="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-1">
          <label class="block mb-1 text-sm font-medium text-black-900 ">
            Medicine Name
          </label>
          <input
            type="text"
            class="bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2.5"
            placeholder="Enter Medicine Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-1">
          <label class="block mb-1 text-sm font-medium text-black-900 ">
            Price
          </label>
          <input
            type="number"
            class="bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2.5"
            placeholder="Enter Price/Unit"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-1">
          <label class="block mb-1 text-sm font-medium text-black-900 ">
            Discription
          </label>
          <input
            type="text"
            class="bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2.5"
            placeholder=" Simple summary covering usage, storage, and essential details"
            required
            value={discription}
            onChange={(e) => setDiscription(e.target.value)}
          />
        </div>
        <div className="mb-1">
          <label class="block mb-1 text-sm font-medium text-black-900 ">
            Manufacturer Name
          </label>
          <input
            type="text"
            class="bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2.5"
            placeholder="Enter Manufacturer name"
            required
            value={manufactureName}
            onChange={(e) => setManufactureName(e.target.value)}
          />
        </div>
        <div className="mb-1">
          <label class="block mb-1 text-sm font-medium text-black-900 ">
            Manufacture Date
          </label>
          <input
            type="date"
            class="bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2.5"
            required
            value={manufacutreDate}
            onChange={(e) => setManufacrureDate(e.target.value)}
          />
        </div>
        <div className="mb-1">
          <label class="block mb-1 text-sm font-medium text-black-900 ">
            Expire Date
          </label>
          <input
            type="date"
            class="bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2.5"
            required
            value={expireDate}
            onChange={(e) => setExpireDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label
            class="block mb-2 text-sm font-medium text-black-900 "
            for="user_avatar"
          >
            Upload file
          </label>
          <input
            class="p-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400"
            type="file"
            // value={coverPic}
            onChange={(e) => setCoverPic(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          class="text-white bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Add Medicine
        </button>
      </form>
    </div>
  );
};

export default ListingPage;
