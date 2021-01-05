import React from 'react'

import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import WebFont from 'webfontloader'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-sliding-pane/dist/react-sliding-pane.css'

import App from 'yvip-website/App'
import { configureStore } from 'yvip-website/redux'

const { store, persistor } = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
)

WebFont.load({
    google: {
        families: ['Lato', 'Ubuntu']
    }
})
