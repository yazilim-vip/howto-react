import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers'

import { composeWithDevTools } from "redux-devtools-extension";

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
    const middlewares = [routerMiddleware(history)]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers)

    return createStore(createRootReducer(history), preloadedState, composedEnhancers)
}