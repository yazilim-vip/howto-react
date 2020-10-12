import { combineReducers } from 'redux'
import * as actions from './actions';

const howtoInitialState = {
    howtoRequest: null,
    rootCategory: null,
    selectedCategory: null,
    selectedHowto: null
}

const howtoBrowserInitialState = {
    categoryHits: [],
    howtoHits: [],
    query: ""
}

const howtoReducer = (state = howtoInitialState, action) => {
    switch (action.type) {
        case actions.CHANGE_HOWTO_REQUEST:
            return Object.assign({}, state, action.howtoRequest)
        case actions.CHANGE_ROOT_CATEGORY:
            return Object.assign({}, state, action.rootCategory)
        case actions.CHANGE_SELECTED_CATEGORY:
            return Object.assign({}, state, action.selectedCategory)
        case actions.CHANGE_SELECTED_HOWTO:
            return Object.assign({}, state, action.selectedHowto)
        default:
            return state
    }
};

const howtoBrowserReducer = (state = howtoBrowserInitialState, action) => {
    switch (action.type) {
        case actions.CHANGE_QUERY:
            return Object.assign({}, state, action.query)
        case actions.CHANGE_CATEGORY_HITS:
            return Object.assign({}, state, action.categoryHits)
        case actions.CHANGE_HOWTO_HITS:
            return Object.assign({}, state, action.howtoHits)
        default:
            return state
    }
};

export default combineReducers({ howtoReducer, howtoBrowserReducer })