import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from "./page/Home";
import About from "./page/About";
import { Button } from 'react-bootstrap';

import './App.css';

const App = () => (
  <Router>
    <div>
      <Button variant="primary">Primary</Button>{' '}

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