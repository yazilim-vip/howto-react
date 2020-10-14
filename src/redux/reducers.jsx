import { combineReducers } from 'redux';
import { connectRouter, LOCATION_CHANGE } from 'connected-react-router';

import { actionTypes } from './actions';

import { parsePathAndSetContent } from '../util/HowToUtil';

const howtoInitialState = {
    isLoaded: false,
    error: null,

    folderPath: "",
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
            const path = action.payload.location.pathname
            console.log("PATH", path);

            if (state.rootCategory && path.startsWith("/howto")) {
                return {
                    ...state,
                    ...parsePathAndSetContent(state.rootCategory, path.replace("/howto/", ""))
                }
            } else {
                return {
                    ...state,
                }
            }

        case actionTypes.ON_PATH_CHANGE:
            return {
                ...state,
                ...parsePathAndSetContent(state.rootCategory, action.path)
            }

        case actionTypes.ON_API_SUCCESS:
            return {
                ...state,
                rootCategory: action.rootCategory,
                isLoaded: true
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
