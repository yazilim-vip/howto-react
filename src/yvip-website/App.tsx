// ReactJS
import React, { FC } from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect } from 'react-router-dom'

// Bootstrap
import { Col, Row } from 'react-bootstrap'

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

// ---------------------------
//  Internal Dependencies
// ---------------------------
// Styles
import 'yvip-website/App.scss'

// Pages
import { HowToPage, NotFound } from 'yvip-website/page'

import { history } from 'yvip-website/redux'

library.add(fab)
library.add(fas)
library.add(far)

const App: FC = () => (
    <ConnectedRouter history={history}>
        {/* BODY */}
        <main className="py-4">
            <Col md="12">
                <Row>
                    <Switch>
                        <Redirect from="/:url*(/+)" to={history.location.pathname.slice(0, -1)} />
                        {/* <Redirect from='/' to='/howto' /> */}
                        <Route exact path="/howto*" component={HowToPage} />
                        <Route path="/404" component={NotFound} />
                        <Redirect to="/404" />
                    </Switch>
                </Row>
            </Col>
        </main>
    </ConnectedRouter>
)

export default App
