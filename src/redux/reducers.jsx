import { actionTypes } from './actions';
import { parsePath, setContent } from '../util/HowToUtil'

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
        case actionTypes.ON_PATH_CHANGE:
            let pathVars = parsePath(action.path)
            return {
                ...state,
                ...pathVars,
                ...setContent(
                    state.rootCategory,
                    pathVars.categoryNames,
                    pathVars.rootCategorySelectedFlag,
                    pathVars.selectedHowtoName
                )
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

export default howtoReducer