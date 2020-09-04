import React from "react";
import { Navbar, Nav, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomNavbar = () => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand className="my-2">
      <img alt="" src="/logo.svg" width="250" />
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <NavLink
          exact
          activeClassName="active"
          className="text-light nav-link"
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          activeClassName="active"
          className="text-light nav-link"
          to="/portfolio"
        >
          Portfolio
        </NavLink>

        <NavLink
          activeClassName="active"
          className="text-light nav-link"
          to="/about"
        >
          About
        </NavLink>
      </Nav>
      <Nav>
        <NavLink
          activeClassName="active"
          className="text-light nav-link"
          to="/about"
        >
          <span className="yvip-icon gitlab">
            <FontAwesomeIcon icon={["fab", "gitlab"]} className="mr-3" />
          </span>
        </NavLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

const styles = {
  slogan: {
    fontSize: "15px",
  },
};

export default CustomNavbar;
