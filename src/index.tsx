import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import WebFont from 'webfontloader'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@yazilim-vip/howto-archive-react/dist/index.css'

import configureStore from './redux/configureStore'
import { PersistGate } from 'redux-persist/integration/react'

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
