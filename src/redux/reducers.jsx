import { combineReducers } from 'redux';
import { connectRouter, LOCATION_CHANGE } from 'connected-react-router';

import { actionTypes } from './actions';

import { parsePathAndSetContent, createSearchIndex } from '../util/HowToUtil';

const howtoReducer = (state = [], action) => {
    switch (action.type) {
        case LOCATION_CHANGE:
            let path = action.payload.location.pathname
            if (path.startsWith("/howto") && state.rootCategory) {
                return {
                    ...state,
                    ...parsePathAndSetContent(state.rootCategory, path),
                    query: ""
                }
            } else {
                return {
                    ...state,
                }
            }

        case actionTypes.ON_API_SUCCESS:
            return {
                ...state,
                rootCategory: action.rootCategory,
                isLoaded: true,
                ...parsePathAndSetContent(action.rootCategory, action.path),
                searchIndex: createSearchIndex(action.rootCategory),
                query: ""
            }

        case actionTypes.ON_API_ERROR:
            return {
                ...state,
                error: action.error,
                isLoaded: true
            }

        case actionTypes.ON_SEARCH:
            return {
                ...state,
                query: action.query,
                categoryHits: action.categoryHits,
                howtoHits: action.howtoHits
            }

        default:
            return state
    }
};

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    howtoReducer
})

export default createRootReducer
