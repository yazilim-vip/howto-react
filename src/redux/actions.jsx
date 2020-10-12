const ON_ERROR = 'ON_ERROR';
const CHANGE_PATH = 'CHANGE_PATH';
const CHANGE_ROOT_CATEGORY = 'CHANGE_ROOT_CATEGORY';
const CHANGE_SELECTED_CATEGORY = 'CHANGE_SELECTED_CATEGORY';
const CHANGE_SELECTED_HOWTO = 'CHANGE_SELECTED_HOWTO';
const CHANGE_CATEGORY_HITS = 'CHANGE_CATEGORY_HITS';
const CHANGE_HOWTO_HITS = 'CHANGE_HOWTO_HITS';

const ON_SEARCH = 'ON_SEARCH';

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

const changeCategoryHits = (hits) => {
    return { type: CHANGE_CATEGORY_HITS, categoryHits: hits }
};

const changeHowtoHits = (hits) => {
    return { type: CHANGE_HOWTO_HITS, howtoHits: hits }
};

const onSearch = (query, categoryHits, howtoHits) => {
    return { type: ON_SEARCH, query, categoryHits, howtoHits }
};

const actionTypes = {
    ON_ERROR,
    CHANGE_PATH,
    CHANGE_ROOT_CATEGORY,
    CHANGE_SELECTED_CATEGORY,
    CHANGE_SELECTED_HOWTO,
    ON_SEARCH,
    CHANGE_CATEGORY_HITS,
    CHANGE_HOWTO_HITS
}

const actionCreators = {
    onError,
    changePath,
    changeRootCategory,
    changeSelectedCategory,
    changeSelectedHowto,
    onSearch,
    changeCategoryHits,
    changeHowtoHits
}

export { actionTypes, actionCreators }