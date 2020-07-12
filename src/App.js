import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from "./page/Home";
import About from "./page/About";
import { Navbar } from 'react-bootstrap';

import './App.css';

const App = () => (
  <Router>
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/logo.svg"
            width="100"
            height="100"
            className="d-inline-block align-top"
          />{' '}
      React Bootstrap
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