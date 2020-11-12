const ON_API_SUCCESS = 'ON_API_SUCCESS'
const ON_API_ERROR = 'ON_API_ERROR'
const ON_SEARCH = 'ON_SEARCH'
const ON_TOGGLE = 'ON_TOGGLE'

const onApiSuccess = (category, path) => {
    return { type: ON_API_SUCCESS, rootCategory: category, path }
}

const onApiError = (error) => {
    return { type: ON_API_ERROR, error }
}

const onSearchResult = (query, categoryHits, howtoHits) => {
    return { type: ON_SEARCH, query, categoryHits, howtoHits }
}

const onToggle = () => {
    return { type: ON_TOGGLE }
}

const actionTypes = {
    ON_API_ERROR,
    ON_API_SUCCESS,
    ON_SEARCH,
    ON_TOGGLE
}

const actionCreators = {
    onApiError,
    onApiSuccess,
    onSearchResult,
    onToggle
}

export { actionTypes, actionCreators }
