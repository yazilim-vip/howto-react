// ---------------------------
//  External Dependencies
// ---------------------------
import { LOCATION_CHANGE } from 'connected-react-router'

export const howToReducer = (state = [], action) => {
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
