const ON_ERROR = 'ON_ERROR';
const CHANGE_PATH = 'CHANGE_PATH';
const CHANGE_ROOT_CATEGORY = 'CHANGE_ROOT_CATEGORY';
const CHANGE_SELECTED_CATEGORY = 'CHANGE_SELECTED_CATEGORY';
const CHANGE_SELECTED_HOWTO = 'CHANGE_SELECTED_HOWTO';
const CHANGE_QUERY = 'CHANGE_QUERY';
const CHANGE_CATEGORY_HITS = 'CHANGE_CATEGORY_HITS';
const CHANGE_HOWTO_HITS = 'CHANGE_HOWTO_HITS';

const onError = (error) => {
    return { type: ON_ERROR, error }
};

const changePath = (path) => {
    return { type: CHANGE_PATH, path }
};

const changeRootCategory = (category) => {
    return { type: CHANGE_ROOT_CATEGORY, rootCategory: category }
};

const changeSelectedCategory = (category) => {
    return { type: CHANGE_SELECTED_CATEGORY, selectedCategory: category }
};

const changeSelectedHowto = (howto) => {
    return { type: CHANGE_SELECTED_HOWTO, selectedHowto: howto }
};

const changeQuery = (query) => {
    return { type: CHANGE_QUERY, query }
};

const changeCategoryHits = (hits) => {
    return { type: CHANGE_CATEGORY_HITS, categoryHits: hits }
};

const changeHowtoHits = (hits) => {
    return { type: CHANGE_HOWTO_HITS, howtoHits: hits }
};

const actionTypes = {
    ON_ERROR,
    CHANGE_PATH,
    CHANGE_ROOT_CATEGORY,
    CHANGE_SELECTED_CATEGORY,
    CHANGE_SELECTED_HOWTO,
    CHANGE_QUERY,
    CHANGE_CATEGORY_HITS,
    CHANGE_HOWTO_HITS
}

const actionCreators = {
    onError,
    changePath,
    changeRootCategory,
    changeSelectedCategory,
    changeSelectedHowto,
    changeQuery,
    changeCategoryHits,
    changeHowtoHits
}

export { actionTypes, actionCreators }