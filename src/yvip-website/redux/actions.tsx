import { HowToActions, TOGGLE_FM_VIEW_MODE } from './types'

// Generic
export interface Action<T, P> {
    readonly type: T
    readonly payload: P
}

export function createAction<T extends string, P>(
    type: T,
    payload: P
): Action<T, P> {
    return { type, payload }
}

// Actions
export const createToggleAction = (): HowToActions => {
    return createAction(TOGGLE_FM_VIEW_MODE, undefined)
}
