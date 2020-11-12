// ---------------------------
//  External Dependencies
// ---------------------------
import { LOCATION_CHANGE } from 'connected-react-router'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import { actionTypes } from './HowToActions'
import { HowTo } from '../..'

const howtoReducer = (state = [], action) => {
    switch (action.type) {
        case LOCATION_CHANGE:
            //! eslint gives error
            // eslint-disable-next-line no-case-declarations
            const path = action.payload.location.pathname
            if (path.startsWith('/howto') && state.rootCategory) {
                return {
                    ...state,
                    ...HowTo.HowToUtil.parsePathAndSetContent(
                        state.rootCategory,
                        path
                    ),
                    query: ''
                }
            } else {
                return {
                    ...state
                }
            }

        case actionTypes.ON_API_SUCCESS:
            return {
                ...state,
                rootCategory: action.rootCategory,
                isLoaded: true,
                ...HowTo.HowToUtil.parsePathAndSetContent(
                    action.rootCategory,
                    action.path
                ),
                searchIndex: HowTo.HowToUtil.createSearchIndex(
                    action.rootCategory
                ),
                query: ''
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

        case actionTypes.ON_TOGGLE:
            return {
                ...state,
                isToggleOn: !state.isToggleOn
            }

        default:
            return state
    }
}

export default howtoReducer
