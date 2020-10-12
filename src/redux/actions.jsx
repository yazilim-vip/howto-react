// howto action types
export const CHANGE_HOWTO_REQUEST = 'CHANGE_HOWTO_REQUEST';
export const CHANGE_ROOT_CATEGORY = 'CHANGE_ROOT_CATEGORY';
export const CHANGE_SELECTED_CATEGORY = 'CHANGE_SELECTED_CATEGORY';
export const CHANGE_SELECTED_HOWTO = 'CHANGE_SELECTED_HOWTO';

// howtoBrowser action types
export const CHANGE_QUERY = 'CHANGE_QUERY';
export const CHANGE_CATEGORY_HITS = 'CHANGE_CATEGORY_HITS';
export const CHANGE_HOWTO_HITS = 'CHANGE_HOWTO_HITS';

// howto action creators
export const changeHowtoRequest = (howtoRequest) => {
    return { type: CHANGE_HOWTO_REQUEST, howtoRequest }
};

export const changeRootCategory = (rootCategory) => {
    return { type: CHANGE_ROOT_CATEGORY, rootCategory }
};

export const changeSelectedCategory = (selectedCategory) => {
    return { type: CHANGE_SELECTED_CATEGORY, selectedCategory }
};

export const changeSelectedHowto = (selectedHowto) => {
    return { type: CHANGE_SELECTED_HOWTO, selectedHowto }
};

// howtoBrowser action creators
export const changeQuery = (query) => {
    return { type: CHANGE_QUERY, query }
};

export const changeCategoryHits = (categoryHits) => {
    return { type: CHANGE_CATEGORY_HITS, categoryHits }
};

export const changeHowtoHits = (howtoHits) => {
    return { type: CHANGE_HOWTO_HITS, howtoHits }
};
