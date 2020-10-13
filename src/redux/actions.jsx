const ON_API_SUCCESS = 'ON_API_SUCCESS';
const ON_API_ERROR = 'ON_API_ERROR';
const ON_PATH_CHANGE = 'ON_PATH_CHANGE';
const SELECT_HOWTO = 'SELECT_HOWTO';
const ON_SEARCH = 'ON_SEARCH';

const onApiSuccess = (category) => {
    return { type: ON_API_SUCCESS, rootCategory: category }
};

const onApiError = (error) => {
    return { type: ON_API_ERROR, error }
};

const onPathChange = (path) => {
    return { type: ON_PATH_CHANGE, path }
};

const selectHowto = (howto) => {
    return { type: SELECT_HOWTO, selectedHowto: howto }
};

const onSearchResult = (categoryHits, howtoHits) => {
    return { type: ON_SEARCH, categoryHits, howtoHits }
};

const actionTypes = {
    ON_PATH_CHANGE,
    ON_API_ERROR,
    ON_API_SUCCESS,
    SELECT_HOWTO,
    ON_SEARCH
}

const actionCreators = {
    onApiError,
    onPathChange,
    onApiSuccess,
    selectHowto,
    onSearchResult
}

export { actionTypes, actionCreators }