// ---------------------------
//  External Dependencies
// ---------------------------
import { LOCATION_CHANGE } from 'connected-react-router'
import { HowTo } from 'yvip-website/component'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import { REDUX_ACTION_TYPES } from 'yvip-website/redux'

export const howToReducer = (state: any = [], action: any) => {
    switch (action.type) {
        case LOCATION_CHANGE:
            return {
                ...state,
                requestedPath: action.payload.location.pathname
            }
        case REDUX_ACTION_TYPES.TOGGLE_FM_VIEW_MODE:
            const prevViewMode =
                state.fileManagerViewMode ||
                HowTo.constants.HOWTO_DEFAULT_VIEW_MODE
            let newViewMode
            if (prevViewMode === HowTo.constants.HOWTO_VIEW_MODE_GRID_VIEW) {
                newViewMode = HowTo.constants.HOWTO_VIEW_MODE_LIST_VIEW
            } else if (
                prevViewMode === HowTo.constants.HOWTO_VIEW_MODE_LIST_VIEW
            ) {
                newViewMode = HowTo.constants.HOWTO_VIEW_MODE_GRID_VIEW
            } else {
                newViewMode = HowTo.constants.HOWTO_DEFAULT_VIEW_MODE
            }
            return {
                ...state,
                fileManagerViewMode: newViewMode
            }
        default:
            return state
    }
}
