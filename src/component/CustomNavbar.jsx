import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import YvipIcon from "./YvipIcon";

const CustomNavbar = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="text-center"
    >
      <div className="animate__animated animate__flipInX">
        <Navbar.Brand className="my-2">
          <a href="/">
            <img alt="" src="/logo.svg" width="250" />
          </a>
        </Navbar.Brand>
      </div>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mx-auto page-nav">
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
          <span activeClassName="active" className="text-light nav-link">
            <YvipIcon
              iconCode={"gitlab"}
              className="animate__animated animate__zoomInLeft"
              link="https://gitlab.com/yazilim.vip"
            />
            <YvipIcon
              iconCode={"github"}
              className="animate__animated animate__zoomInLeft"
              link="https://github.com/yazilim-vip"
            />
            <YvipIcon
              iconCode={"bitbucket"}
              className="animate__animated animate__zoomInLeft"
              link="https://bitbucket.org/yazilimvip/"
            />
            <YvipIcon
              iconCode={"docker"}
              className="animate__animated animate__zoomInLeft"
              link="https://hub.docker.com/orgs/yazilimvip/repositories"
            />
            <YvipIcon
              iconCode={"linkedin"}
              className="animate__animated animate__zoomInLeft"
              link="https://www.linkedin.com/company/yazilimvip"
            />
            <YvipIcon
              iconCode={"medium"}
              className="animate__animated animate__zoomInLeft"
              link="https://medium.com/yazilim-vip"
            />
            <YvipIcon
              iconCode={"discord"}
              className="animate__animated animate__zoomInLeft"
              link=""
            />
          </span>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
