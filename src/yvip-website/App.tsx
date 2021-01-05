import React, { FC } from 'react'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { ConnectedRouter } from 'connected-react-router'
import { Col, Row } from 'react-bootstrap'
import { Switch, Route, Redirect } from 'react-router-dom'

import { HowToPage } from 'yvip-website/page/HowToPage'
import { NotFound } from 'yvip-website/page/NotFound'
import { history } from 'yvip-website/redux'
import 'yvip-website/App.scss'

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
