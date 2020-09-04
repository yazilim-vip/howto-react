import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import YvipIcon from "./YvipIcon";

const CustomNavbar = () => {
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  return (
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
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
          >
            {/* <div className={`d-inline-block  ${hovered ? "animated animate__heartBeat" : ""}`}>
              <YvipIcon iconCode={"gitlab"} />
            </div> */}
            <YvipIcon
              iconCode={"gitlab"}
              className="animate__animated animate__zoomInLeft"
            />
            <YvipIcon
              iconCode={"github"}
              className="animate__animated animate__zoomInLeft"
            />
            <YvipIcon
              iconCode={"bitbucket"}
              className="animate__animated animate__zoomInLeft"
            />
            <YvipIcon
              iconCode={"linkedin"}
              className="animate__animated animate__zoomInLeft"
            />

          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const styles = {
  iconAnimationWrapper: {
    display: "inlineBlock",
  },
};

export default CustomNavbar;
