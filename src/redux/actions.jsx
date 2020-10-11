// action types
export const CHANGE_HOWTO_REQUEST = 'CHANGE_HOWTO_REQUEST';
export const CHANGE_ROOT_CATEGORY = 'CHANGE_ROOT_CATEGORY';
export const CHANGE_SELECTED_CATEGORY = 'CHANGE_SELECTED_CATEGORY';
export const CHANGE_SELECTED_HOWTO = 'CHANGE_SELECTED_HOWTO';

// action creators
export const changeHowtoRequest = (howtoRequest) => {
    return { type: CHANGE_HOWTO_REQUEST, howtoRequest }
};

export const changeRootCategory = (category) => {
    return { type: CHANGE_ROOT_CATEGORY, category }
};

export const changeSelectedCategory = (category) => {
    return { type: CHANGE_SELECTED_CATEGORY, category }
};

export const changeSelectedHowto = (howto) => {
    return { type: CHANGE_SELECTED_HOWTO, howto }
};

