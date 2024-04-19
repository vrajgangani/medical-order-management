import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const MyNavbar = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const logOutUSer = () => {
    firebase.logoutUser();
    navigate("/login");
  };

  const currentUser = firebase.user?.email;

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Medical Order Management System</Navbar.Brand>
        <Nav>
          {currentUser === "admin@gmail.com" && (
            <>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/medicine/list">Add Listing</Nav.Link>
              <Nav.Link href="/medicine/orders">Orders</Nav.Link>
            </>
          )}

          <Nav.Link onClick={logOutUSer} className="me-auto">
            Logout
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
