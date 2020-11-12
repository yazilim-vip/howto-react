import { HOWTO_ACTION_TYPES } from './'

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

const onSearchResult = (query, categoryHits, howtoHits) => {
    return {
        type: HOWTO_ACTION_TYPES.ON_SEARCH,
        query,
        categoryHits,
        howtoHits
    }
}

const onToggle = () => {
    return { type: HOWTO_ACTION_TYPES.ON_TOGGLE }
}

export const HOWTO_ACTION_CREATORS = {
    onApiError,
    onApiSuccess,
    onSearchResult,
    onToggle
}
