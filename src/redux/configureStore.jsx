import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers'
import { composeWithDevTools } from "redux-devtools-extension"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
}

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
    // Middlewares
    const middlewares = [routerMiddleware(history)]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    // Enhancers
    const enhancers = [middlewareEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers)

    // Reducers
    const rootReducer = createRootReducer(history)
    const persistedReducer = persistReducer(persistConfig, rootReducer)

    // Store & Persistor
    const store = createStore(persistedReducer, preloadedState, composedEnhancers)
    const persistor = persistStore(store)

    return { store, persistor }
}