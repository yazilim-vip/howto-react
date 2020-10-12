import { actionTypes } from './actions';
import { pathParser } from '../util/HowToUtil'
import { combineReducers } from 'redux';

const howtoInitialState = {
    isLoaded: false,
    selectedCategory: null,
    query: "",
}

const howtoBrowserInitialState = {
    howtoSelectedFlag: false,
    selectedCategory: null,
    selectedHowto: null,
    selectedHowtoName: null,
    categoryNames: [],
    folderPath: "",
    query: "",
    categoryHits: [],
    howtoHits: [],
}

const howtoReducer = (state = howtoInitialState, action) => {
    switch (action.type) {
        case actionTypes.ON_API_ERROR:
            return Object.assign({}, state, {
                error: action.error,
                isLoaded: false
            })

        case actionTypes.ON_PATH_CHANGE:
            return Object.assign({}, state, pathParser(action.path))

        case actionTypes.ON_API_SUCCESS:
            return Object.assign({}, state, {
                rootCategory: action.rootCategory,
                // selectedCategory: action.rootCategory, // !
                selectedHowto: null,
                isLoaded: true
            })

        case actionTypes.SELECT_CATEGORY:
            return { ...state, selectedCategory: action.selectedCategory }

        case actionTypes.SELECT_HOWTO:
            return Object.assign({}, state, {
                selectedHowto: action.selectedHowto
            })

        default:
            return state
    }
};

const howtoBrowserReducer = (state = howtoBrowserInitialState, action) => {
    switch (action.type) {
        case actionTypes.ON_SEARCH:
            return Object.assign({}, state, {
                query: action.query,
                categoryHits: action.categoryHits,
                howtoHits: action.howtoHits
            })
        default:
            return state
    }
};

export default combineReducers({ howtoReducer, howtoBrowserReducer })