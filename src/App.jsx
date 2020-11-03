// ReactJS
import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect } from 'react-router-dom'

// Bootstrap
import { Col, Navbar, Row } from 'react-bootstrap'

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// ---------------------------
//  Internal Dependencies
// ---------------------------
// Styles
import './style/App.scss'

// Components
import CustomNavbar from './component/CustomNavbar'

// Pages
import Home from './page/Home'
import Portfolio from './page/Portfolio'
import HowTo from './page/HowTo'
import About from './page/About'
import NotFound from './page/NotFound'

import { history } from './redux/configureStore'

library.add(fab)
library.add(fas)
library.add(far)

const App = () => (
  <ConnectedRouter history={history}>
    {/* HEADER */}
    <header>
      <CustomNavbar />
    </header>

    {/* BODY */}
    <main className='py-4'>
      <Col md='12'>
        <Row>
          <Switch>
            <Redirect
              from='/:url*(/+)'
              to={history.location.pathname.slice(0, -1)}
            />
            <Route exact path='/' component={Home} />
            <Route path='/portfolio' component={Portfolio} />
            <Route path='/howto' component={HowTo} />
            <Route path='/about' component={About} />
            <Route path='/404' component={NotFound} />
            <Redirect to='/404' />
          </Switch>
        </Row>
      </Col>
    </main>

    {/* FOOTER */}
    <footer className='text-white-50'>
      <Navbar bg='dark'>
        <Col
          md={{
            span: 8,
            offset: 2
          }}
        >
          <Row>
            <Col md='12'>
              <span>
                <FontAwesomeIcon icon={faEnvelope} className='ml-3' />
              </span>
              <span> : info@yazilim.vip</span>
            </Col>
            <Col md='12'>© yazilim.vip All Rights Reserved</Col>
          </Row>
        </Col>
      </Navbar>
    </footer>
  </ConnectedRouter>
)

export default App
