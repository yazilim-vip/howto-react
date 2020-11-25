const TOGGLE_FM_VIEW_MODE = 'TOGGLE_FM_VIEW_MODE'
export const REDUX_ACTION_TYPES = {
    TOGGLE_FM_VIEW_MODE: TOGGLE_FM_VIEW_MODE
}

const toggleFmViewMode = () => {
    return {
        type: REDUX_ACTION_TYPES.TOGGLE_FM_VIEW_MODE
    }
}
export const REDUX_ACTION_CREATORS = {
    toggleFmViewMode: toggleFmViewMode
}
