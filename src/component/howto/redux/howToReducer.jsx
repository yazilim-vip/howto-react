// ---------------------------
//  External Dependencies
// ---------------------------
import { LOCATION_CHANGE } from 'connected-react-router'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import { parsePathAndSetContent, createSearchIndex } from '../util'
import { HOWTO_ACTION_TYPES } from './howToActionTypes'

export const howToReducer = (state = [], action) => {
    switch (action.type) {
        case LOCATION_CHANGE:
            return {
                ...state,
                requestedPath: action.payload.location.pathname
            }
        case HOWTO_ACTION_TYPES.ON_API_SUCCESS:
            return {
                ...state,
                rootCategory: action.rootCategory,
                isLoaded: true,
                ...parsePathAndSetContent(action.rootCategory, action.path),
                searchIndex: createSearchIndex(action.rootCategory),
                query: ''
            }

        case HOWTO_ACTION_TYPES.ON_API_ERROR:
            return {
                ...state,
                error: action.error,
                isLoaded: true
            }
        default:
            return state
    }
}
