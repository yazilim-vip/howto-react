import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import Home from "./page/Home";
import About from "./page/About";

import './App.css';

import PageFooterComponent from './component/PageFooterComponent';
import GridLayout from './layout/GridLayout';
import PageHeaderComponent from './component/PageHeaderComponent';

const App = () => (
  <Router>

    <PageHeaderComponent />

    {/* BODY */}
    <div className="mt-4">
      <GridLayout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/another' component={About} />
        </Switch>
      </GridLayout>
    </div>

    <PageFooterComponent />

  </Router>
);

export default App;