import { actionTypes } from './actions';
import { parsePath, loadCategory } from '../util/HowToUtil'

const howtoInitialState = {
    isLoaded: false,
    folderPath: "",
    categoryNames: [],
    selectedCategoryName: null,
    selectedHowtoName: null,
    howtoSelectedFlag: false,
    rootCategorySelectedFlag: null,
    selectedCategory: null,
    selectedHowto: null,

    query: "",
    categoryHits: [],
    howtoHits: [],
}

const howtoReducer = (state = howtoInitialState, action) => {
    switch (action.type) {
        case actionTypes.ON_PATH_CHANGE:
            return {
                ...state,
                ...parsePath(action.path)
            }

        case actionTypes.ON_API_SUCCESS:
            return {
                ...state,
                rootCategory: action.rootCategory,
                selectedHowto: null,
                isLoaded: true
            }

        case actionTypes.ON_API_ERROR:
            return {
                ...state,
                error: action.error,
                isLoaded: false
            }

        case actionTypes.SELECT_CATEGORY:
            return {
                ...state,
                ...loadCategory(state.rootCategory, state.categoryNames, state.rootCategorySelectedFlag)
            }

        case actionTypes.SELECT_HOWTO:
            return {
                ...state,
                selectedHowto: action.selectedHowto
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

export default howtoReducer