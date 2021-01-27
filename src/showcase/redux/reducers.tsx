/* eslint-disable @typescript-eslint/no-explicit-any */
import { LocationChangeAction, LOCATION_CHANGE } from 'connected-react-router'
import { Reducer } from 'redux'

import { HOWTO_VIEW_MODE_GRID_VIEW, HOWTO_VIEW_MODE_LIST_VIEW, HOWTO_DEFAULT_VIEW_MODE } from '../../lib'
import { HowToActions, TOGGLE_FM_VIEW_MODE } from './types'

export const howToReducer = (state: any = [], action: HowToActions): Reducer => {
    switch (action.type) {
        case TOGGLE_FM_VIEW_MODE:
            const prevViewMode = state.fileManagerViewMode || HOWTO_DEFAULT_VIEW_MODE
            let newViewMode
            if (prevViewMode === HOWTO_VIEW_MODE_GRID_VIEW) {
                newViewMode = HOWTO_VIEW_MODE_LIST_VIEW
            } else if (prevViewMode === HOWTO_VIEW_MODE_LIST_VIEW) {
                newViewMode = HOWTO_VIEW_MODE_GRID_VIEW
            } else {
                newViewMode = HOWTO_DEFAULT_VIEW_MODE
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
            return {
                ...state,
                requestedPath: action.payload.location.pathname
            }
        default:
            return state
    }
}
