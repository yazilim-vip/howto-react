import React, { FC } from 'react'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { ConnectedRouter } from 'connected-react-router'
import firebase from 'firebase/app'
import 'firebase/database'
import { Container, Row } from 'react-bootstrap'
import { Switch, Route, Redirect } from 'react-router-dom'

import { HowToPage } from 'yvip-website/HowToPage'
import { history } from 'yvip-website/redux'
import 'yvip-website/App.scss'

// Firabase
const config = {
    databaseURL: 'https://yvip-howto.firebaseio.com',
    projectId: 'yvip-howto'
}
export const Firebase = firebase.initializeApp(config)

// Fontaweome
library.add(fab)
library.add(fas)
library.add(far)

const App: FC = () => (
    <ConnectedRouter history={history}>
        {/* BODY */}
        <main className="py-4">
            <Container fluid>
                <Row>
                    <Switch>
                        <Redirect from="/:url*(/+)" to={history.location.pathname.slice(0, -1)} />
                        <Route exact path="/howto*" component={HowToPage} />
                        <Redirect to="/howto" />
                    </Switch>
                </Row>
            </Container>
        </main>
    </ConnectedRouter>
)

export default App
