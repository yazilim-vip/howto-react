// ReactJS 
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Bootstrap
import { Row, Col, Navbar } from 'react-bootstrap';

// Pages
import Home from "./page/Home";
import About from "./page/About";
import Portfolio from "./page/Portfolio";

import './App.css';
import CustomNavbar from './component/CustomNavbar';


const App = () => (
  <Router>

    {/* HEADER */}
    <header>
      <CustomNavbar />
    </header>

    {/* BODY */}
    <main className="my-4">
      <Col md={{ span: 12 }}>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/portfolio' component={Portfolio} />
              <Route exact path='/about' component={About} />
            </Switch>
          </Col>
        </Row>
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