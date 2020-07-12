import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from "./page/Home";
import About from "./page/About";
import { Navbar, Nav, Row, Col, Container } from 'react-bootstrap';

import './App.css';

const App = () => (
  <Router>
    <div>

      <div style={styles.navbar}>
        <Col md={{ span: 12 }}>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>

              <Navbar bg="dark" variant="dark">

                <Navbar.Brand href="#home">
                  <img
                    alt=""
                    src="/logo.svg"
                    width="170"
                    className="d-inline-block align-top"
                  />{' '}
                  <span style={styles.slogan} className="text-white-50 d-block">
                    Do the right, not the easy
                  </span>
                </Navbar.Brand>

                <Nav className="mr-auto">
                  <Nav.Link>
                    <Link className="text-light" to={'/'}>Home</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link className="text-light" to={'/another'}>About</Link>
                  </Nav.Link>
                </Nav>

              </Navbar>
            </Col>
          </Row>
        </Col>
      </div>

      <div className="mt-4">
        <Col md={{ span: 12 }}>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/another' component={About} />
              </Switch>
            </Col>
          </Row>
        </Col>
      </div>
    </div>

  </Router>
);

const styles = {
  slogan: {
    fontSize: '15px'
  },

  navbar: {
    backgroundColor: '#343a40'
  }
}

export default App;