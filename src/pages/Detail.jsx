/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import Form from "react-bootstrap/Form";
import { Label, Modal, TextInput } from "flowbite-react";

const Detail = () => {
  const params = useParams();
  const firebase = useFirebase();
  const navigate = useNavigate();
  const User = firebase?.user?.email;
  const [qty, setQty] = useState(1);
  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);
  const [model, setModel] = useState(false);

  const [updateName, setUpdateName] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");

  const updatedObject = {
    name: updateName,
    price: updatePrice,
    manufacutreDate: data?.manufacutreDate,
    manufactureName: data?.manufactureName,
    imageURL: data?.imageURL,
    expireDate: data?.expireDate,
    discription: data?.discription,
  };

  const sendEmailBody = `Thank you for your recent order with Medical Order Management System. We are pleased to confirm that your order has been successfully processed. Below are the details of your purchase:

  Order Summary:
 Medicine Name: ${data?.name} , 
 Quantity: ${qty} , 
 Price: ${data?.price} , 
 Total Amount: ${qty * data?.price}
  `;

  useEffect(() => {
    firebase
      .getmedicineById(params.medicineId)
      .then((value) => setData(value.data()));
  }, []);

  useEffect(() => {
    if (data) {
      const imageURL = data?.imageURL;
      firebase.getImageURL(imageURL).then((url) => setURL(url));
    }
  }, [data]);

  const sendEmail = () => {
    window.Email.send({
      Host: "smtp.elasticemail.com",
      Username: "vrajgangani1818@gmail.com",
      Password: "512261329F9E5EDF40E6BE66F53BC431A40A",
      To: `${User}`,
      From: "vrajgangani1818@gmail.com",
      Subject: `Order Confirmation ${data.userID}`,
      Body: sendEmailBody,
    }).then((message) => message);
    console.log("sendemail");
  };

  const placeOrder = async () => {
    alert("Your Order has been placed! Please check you mail.");
    setQty(1);
    const result = await firebase.placeOrder(params.medicineId, qty);
    console.log("Order Placed", result);
    navigate("/");
    sendEmail();
  };

  if (data == null) return <h1>Loading...</h1>;

  const updateData = () => {
    setModel(true);
    console.log(updatedObject, "updated object");
    firebase.updateProductData(params.medicineId, updatedObject);
    setModel(false);
  };

  const deleteData = () => {
    console.log("deleteData");
    firebase.deleteProductData(params.medicineId);
    navigate("/");
  };

  return (
    <>
      <Modal show={model} size="md" onClose={() => setModel(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Update Information
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="Name" />
              </div>
              <TextInput
                id="text"
                placeholder="Update Name"
                required
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Price" />
              </div>
              <TextInput
                type="number"
                required
                placeholder="Update Price"
                value={updatePrice}
                onChange={(e) => setUpdatePrice(e.target.value)}
              />
            </div>
            <button
              onClick={updateData}
              class="text-white bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-3"
            >
              Update
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <div className="container m-5 d-flex">
        <div className="col-6">
          <h2 className="mb-3">{data.name}</h2>
          <img src={url} height={"400px"} style={{ borderRadius: "10px" }} />
        </div>
        <div className="ms-5 col-6">
          <h2 className="mb-3">Details</h2>
          <p>
            <strong>Price: </strong> {data.price}₹
          </p>
          <p>
            <strong>About:</strong> {data.discription}
          </p>
          <p>
            <strong>Manufacture Date:</strong> {data.manufacutreDate}
          </p>
          <p>
            <strong>Expire Date:</strong> {data.expireDate}
          </p>
          <p>
            <strong>Manufacture Name: </strong>
            {data?.manufactureName}
          </p>

          {User !== "admin@gmail.com" ? (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Qty</Form.Label>
                <Form.Control
                  onChange={(e) => setQty(e.target.value)}
                  value={qty}
                  type="Number"
                  min={0}
                  placeholder="Enter Qty"
                />
              </Form.Group>
              <button
                onClick={placeOrder}
                class="text-white bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-3"
              >
                Place Order
              </button>
            </>
          ) : (
            <>
              <button
                onClick={updateData}
                class="text-white bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-3"
              >
                Update Data
              </button>
              <button
                onClick={deleteData}
                class="text-white bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Delete Data
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Detail;
