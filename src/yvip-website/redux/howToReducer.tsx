import { LocationChangeAction, LOCATION_CHANGE } from 'connected-react-router'
import { Reducer } from 'redux'

import { HowTo } from 'yvip-website/component'
import { HowToActions, TOGGLE_FM_VIEW_MODE } from 'yvip-website/redux'

export const howToReducer = (state: any = [], action: HowToActions): Reducer => {
    switch (action.type) {
        case TOGGLE_FM_VIEW_MODE:
            const prevViewMode = state.fileManagerViewMode || HowTo.constants.HOWTO_DEFAULT_VIEW_MODE
            let newViewMode
            if (prevViewMode === HowTo.constants.HOWTO_VIEW_MODE_GRID_VIEW) {
                newViewMode = HowTo.constants.HOWTO_VIEW_MODE_LIST_VIEW
            } else if (prevViewMode === HowTo.constants.HOWTO_VIEW_MODE_LIST_VIEW) {
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

export const locationReducer = (state: any = [], action: LocationChangeAction): Reducer => {
    switch (action.type) {
        case LOCATION_CHANGE:
            console.log('LOCATION', action.payload)
            return {
                ...state,
                requestedPath: action.payload.location.pathname
            }
        default:
            return state
    }
}
