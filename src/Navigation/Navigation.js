import React, { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import textLogo from "../assets/text_logo.png";
import { useNavigate } from "react-router-dom";

function Navigation({ setLoggedIn, routes_link }) {
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.setItem("loggedIn", "");
    setLoggedIn(false);
    signOut(getAuth());
    navigate("/");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand className="mx-2">
        <img className="mx-4" src={textLogo} style={{ width: 50 }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {routes_link
            .filter((item) => {
              if (item.path !== "/") {
                return item;
              }
            })
            .map((item) => (
              <Nav.Link onClick={() => navigate(item.path)}>
                {item.name}
              </Nav.Link>
            ))}

          <NavDropdown title="Menu" id="basic-nav-dropdown">
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>Signout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
