import { actionTypes } from './actions';
import { pathParser } from '../util/HowToUtil'

const initialState = {
    error: null,
    isLoaded: false,
    path: null,
    rootCategory: null,
    selectedCategory: null,
    selectedHowto: null,
    query: "",
    categoryHits: [],
    howtoHits: [],
    categoryNames: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // howto
        case actionTypes.ON_ERROR:
            return Object.assign({}, state, {
                error: action.error,
                isLoaded: false
            })
        case actionTypes.CHANGE_PATH:
            return Object.assign({}, state, pathParser(action.path))
        case actionTypes.CHANGE_ROOT_CATEGORY:
            return Object.assign({}, state, {
                rootCategory: action.rootCategory,
                selectedCategory: action.rootCategory, // !
                selectedHowto: null,
                isLoaded: true
            })
        case actionTypes.CHANGE_SELECTED_CATEGORY:
            return Object.assign({}, state, action.selectedCategory)
        case actionTypes.CHANGE_SELECTED_HOWTO:
            return Object.assign({}, state, action.selectedHowto)

        // howtoBrowser
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

export default reducer