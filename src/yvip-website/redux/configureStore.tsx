// ---------------------------
//  External Dependencies
// ---------------------------
import { createBrowserHistory, History } from 'history'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// ---------------------------
//  Internal Dependencies
// ---------------------------
import { howToReducer, locationReducer } from 'yvip-website/redux'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['fileManagerViewMode']
}

export const history = createBrowserHistory()

const createRootReducer = (history: History<unknown>) =>
    combineReducers({
        router: connectRouter(history),
        howtoReducer: persistReducer(persistConfig, howToReducer),
        locationReducer
    })

export function configureStore(preloadedState = undefined) {
    // Middlewares
    const middlewares = [routerMiddleware(history)]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    // Enhancers
    const enhancers = [middlewareEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers)

    // Reducers
    const persistedRootReducer = createRootReducer(history)

    // Store & Persistor
    const store = createStore(
        persistedRootReducer,
        preloadedState,
        composedEnhancers
    )

    const persistor = persistStore(store)

    return { store, persistor }
}
