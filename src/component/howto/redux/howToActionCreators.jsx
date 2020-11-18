import { HOWTO_ACTION_TYPES } from './howToActionTypes'

const onApiSuccess = (category, path) => {
    return {
        type: HOWTO_ACTION_TYPES.ON_API_SUCCESS,
        rootCategory: category,
        path
    }
}

const onApiError = (error) => {
    return { type: HOWTO_ACTION_TYPES.ON_API_ERROR, error }
}

export const HOWTO_ACTION_CREATORS = {
    onApiError,
    onApiSuccess
}
