// howto action types
export const ON_ERROR = 'ON_ERROR';
export const CHANGE_HOWTO_REQUEST = 'CHANGE_HOWTO_REQUEST';
export const CHANGE_ROOT_CATEGORY = 'CHANGE_ROOT_CATEGORY';
export const CHANGE_SELECTED_CATEGORY = 'CHANGE_SELECTED_CATEGORY';
export const CHANGE_SELECTED_HOWTO = 'CHANGE_SELECTED_HOWTO';

// howtoBrowser action types
export const CHANGE_QUERY = 'CHANGE_QUERY';
export const CHANGE_CATEGORY_HITS = 'CHANGE_CATEGORY_HITS';
export const CHANGE_HOWTO_HITS = 'CHANGE_HOWTO_HITS';

// howto action creators
export const onError = (error) => {
    return { type: ON_ERROR, error }
};

export const changeHowtoRequest = (howtoRequest) => {
    return { type: CHANGE_HOWTO_REQUEST, howtoRequest }
};

export const changeRootCategory = (category) => {
    return { type: CHANGE_ROOT_CATEGORY, rootCategory: category }
};

export const changeSelectedCategory = (category) => {
    return { type: CHANGE_SELECTED_CATEGORY, selectedCategory: category }
};

export const changeSelectedHowto = (howto) => {
    return { type: CHANGE_SELECTED_HOWTO, selectedHowto: howto }
};

// howtoBrowser action creators
export const changeQuery = (query) => {
    return { type: CHANGE_QUERY, query }
};

export const changeCategoryHits = (hits) => {
    return { type: CHANGE_CATEGORY_HITS, categoryHits: hits }
};

export const changeHowtoHits = (hits) => {
    return { type: CHANGE_HOWTO_HITS, howtoHits: hits }
};
