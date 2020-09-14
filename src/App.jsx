// ReactJS 
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// Bootstrap
import { Col, Navbar } from 'react-bootstrap';

// Pages
import Home from "./page/Home";
import Portfolio from "./page/Portfolio";
import HowTo from './page/HowTo';
import About from "./page/About";

import './App.scss';
import CustomNavbar from './component/CustomNavbar';

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)


const App = () => (
  <Router>

    {/* HEADER */}
    <header>
      <CustomNavbar />
    </header>

    {/* BODY */}
    <main className="py-4">
      <Col md={{ span: 12 }}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/portfolio' component={Portfolio} />
          <Route path='/howto/*' component={HowTo} />
          <Route path='/about' component={About} />
          <Redirect path='/howto' to="/howto/" />
        </Switch>
      </Col>
    </main>

    {/* FOOTER */}
    <footer>
      <Navbar bg="dark" className="justify-content-center">
        <span className="text-white-50">© yazilim.vip All Rights Reserved</span>
      </Navbar>
    </footer>

  </Router>
);

export default App;