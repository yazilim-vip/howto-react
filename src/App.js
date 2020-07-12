import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from "./page/Home";
import About from "./page/About";
import { Navbar, Row, Col } from 'react-bootstrap';

import './App.css';

const App = () => (
  <Router>
    <div>
      <Navbar bg="dark" variant="dark" className="text-center">
        <Navbar.Brand href="#home">
          <Row>
            <Col>
              <img
                alt=""
                src="/logo.svg"
                width="170"
                className="d-inline-block align-top"
              />{' '}
            </Col>
          </Row>
          <Row>
            <Col>
            <span className="text-white-50">
              Do the right, not the easy
            </span>
            </Col>
          </Row>
        </Navbar.Brand>
      </Navbar>

      <h2>React Router Example</h2>
      <ul>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/another'}>About</Link></li>
      </ul>
      <hr />

      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/another' component={About} />
      </Switch>
    </div>

  </Router>
);

export default App;