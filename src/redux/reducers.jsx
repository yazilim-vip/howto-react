import { combineReducers } from 'redux';
import { connectRouter, LOCATION_CHANGE } from 'connected-react-router';

import { actionTypes } from './actions';

import { parsePathAndSetContent } from '../util/HowToUtil';

const howtoInitialState = {
    isLoaded: false,
    error: null,

    folderPath: "/howto",
    categoryNames: [],

    selectedCategory: null,
    selectedHowto: null,

    selectedCategoryName: null,
    selectedHowtoName: null,

    rootCategorySelectedFlag: null,
    howtoSelectedFlag: false,

    categoryHits: [],
    howtoHits: [],
}

const howtoReducer = (state = howtoInitialState, action) => {
    switch (action.type) {
        case LOCATION_CHANGE:
            let path = action.payload.location.pathname
            if (path.startsWith("/howto") && state.rootCategory) {
                return {
                    ...state,
                    ...parsePathAndSetContent(
                        state.rootCategory,
                        path
                    )
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
                ...parsePathAndSetContent(
                    action.rootCategory,
                    action.path
                )
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
