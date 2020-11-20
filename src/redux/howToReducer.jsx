// ---------------------------
//  External Dependencies
// ---------------------------
import { LOCATION_CHANGE } from 'connected-react-router'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import { REDUX_ACTION_TYPES } from './actions'

export const howToReducer = (state = [], action) => {
    switch (action.type) {
        case LOCATION_CHANGE:
            return {
                ...state,
                requestedPath: action.payload.location.pathname
            }
        case REDUX_ACTION_TYPES.ON_FM_VIEW_MODE_CHANGE:
            console.log(action)
            return {
                ...state,
                fileManagerViewMode: action.fileManagerViewMode
            }
        default:
            return state
    }
}
