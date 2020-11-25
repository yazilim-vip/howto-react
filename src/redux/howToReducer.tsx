// ---------------------------
//  External Dependencies
// ---------------------------
import { LOCATION_CHANGE } from 'connected-react-router'
import {
    FileManagerViewMode,
    HOWTO_DEFAULT_VIEW_MODE,
    HOWTO_VIEW_MODE_GRID_VIEW,
    HOWTO_VIEW_MODE_LIST_VIEW
} from '../component'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import { REDUX_ACTION_TYPES } from './actions'

export const howToReducer = (state = [], action: any) => {
    switch (action.type) {
        case LOCATION_CHANGE:
            return {
                ...state,
                requestedPath: action.payload.location.pathname
            }
        case REDUX_ACTION_TYPES.TOGGLE_FM_VIEW_MODE:
            const prevViewMode =
                state.fileManagerViewMode || HOWTO_DEFAULT_VIEW_MODE
            let newViewMode
            if (prevViewMode === HOWTO_VIEW_MODE_GRID_VIEW) {
                newViewMode = HOWTO_VIEW_MODE_LIST_VIEW
            } else if (prevViewMode === HOWTO_VIEW_MODE_LIST_VIEW) {
                newViewMode = HOWTO_VIEW_MODE_GRID_VIEW
            } else {
                newViewMode = HOWTO_DEFAULT_VIEW_MODE
            }

            console.log(prevViewMode, ' => ', newViewMode)
            return {
                ...state,
                fileManagerViewMode: newViewMode
            }
        default:
            return state
    }
}
