
const ON_API_SUCCESS = 'ON_API_SUCCESS';
const ON_API_ERROR = 'ON_API_ERROR';
const ON_SEARCH = 'ON_SEARCH';

const onApiSuccess = (category, path) => {
    return { type: ON_API_SUCCESS, rootCategory: category, path }
};

const onApiError = (error) => {
    return { type: ON_API_ERROR, error }
};

const onSearchResult = (query, categoryHits, howtoHits) => {
    return { type: ON_SEARCH, query, categoryHits, howtoHits }
};

const actionTypes = {
    ON_API_ERROR,
    ON_API_SUCCESS,
    ON_SEARCH
}

const actionCreators = {
    onApiError,
    onApiSuccess,
    onSearchResult
}

export { actionTypes, actionCreators }