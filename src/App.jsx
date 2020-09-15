// ReactJS 
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// Bootstrap
import { Col, Navbar, Row } from 'react-bootstrap';

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
import { fas, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fab)
library.add(fas)


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
    <footer className="text-white-50">
      <Navbar bg="dark">
        <Col md="12">
          <Row>
            <Col md="12">
              <span><FontAwesomeIcon icon={faEnvelope} className="ml-3" /></span>
              <span> : info@yazilim.vip</span>
            </Col>
            <Col md="12">
              © yazilim.vip All Rights Reserved
            </Col>
          </Row>
        </Col>
      </Navbar>

    </footer>

  </Router>
);

export default App;